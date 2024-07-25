const Razorpay = require('razorpay');
const crypto = require('crypto');
const Order = require('../models/order.model');
const Cart = require('../models/cart.model');
const Payment = require('../models/payment.model');

const instance = new Razorpay({
  key_id: process.env.ROZID,
  key_secret: process.env.ROZKEY,
});

exports.checkout = async (req, res) => {
  try {
    const cartItems = await Cart.find({ user: req.user.id }).populate('product');

    if (cartItems.length === 0) {
      return res.status(400).json({ message: 'Your cart is empty' });
    }

    const totalAmount = cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);

    const options = {
      amount: Number(totalAmount * 100), // amount in the smallest currency unit
      currency: 'INR',
      receipt: `receipt_order_${Date.now()}`,
      notes: {
        userId: req.user.id.toString(), // Add user ID in the metadata
      },
    };

    const order = await instance.orders.create(options);

    const newOrder = await Order.create({
      orderId: order.id,
      user: req.user.id,
      amount: order.amount,
      status: 'created',
      items: cartItems.map(item => ({
        product: item.product._id,
        quantity: item.quantity,
      })),

    });

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

exports.paymentVerification = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  const body = razorpay_order_id + '|' + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac('sha256', process.env.ROZKEY)
    .update(body.toString())
    .digest('hex');

  const isAuthentic = expectedSignature === razorpay_signature;

  if (isAuthentic) {
    const order = await instance.orders.fetch(razorpay_order_id);
    const foundOrder = await Order.findOne({ orderId: order.id });

    foundOrder.status = order.status === 'paid' ? 'completed' : 'failed';
    await foundOrder.save();

    await Payment.create({
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    });
    
   let ans= await Cart.deleteMany({ user: order.notes.userId });
   console.log(ans)
    res.redirect(`${process.env.BASEURL}/`);
  } else {
    res.status(400).json({
      success: false,
      message: 'Payment verification failed',
    });
  }
};


