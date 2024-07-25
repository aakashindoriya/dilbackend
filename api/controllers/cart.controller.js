// controllers/cartController.js
const Cart = require('../models/cart.model');

exports.getAllCarts = async (req, res) => {
  try {
    const carts = await Cart.find({ user: req.user.id }).populate('product');
    res.status(200).json({  data: carts });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

exports.createCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const cart = new Cart({ user: req.user.id, product: productId, quantity });
    await cart.save();
    res.status(201).json({ status: 'success', data: cart });
  } catch (error) {
    res.status(500).json({ status: 'error', msg: error.message });
  }
};

exports.deleteCart = async (req, res) => {
  try {
    await Cart.findOneAndDelete({ user: req.user.id, product: req.params.id });
    res.status(204).json({ status: 'success', msg: 'Cart item deleted' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};
