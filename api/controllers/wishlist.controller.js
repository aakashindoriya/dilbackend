// controllers/wishlistController.js
const Wishlist = require('../models/wishlist.model');

exports.getAllWishlists = async (req, res) => {
  try {
    const wishlists = await Wishlist.find({ user: req.user.id }).populate('product');
    res.status(200).json({  data: wishlists });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

exports.createWishlist = async (req, res) => {
  try {
    const { productId } = req.body;
    const wishlist = new Wishlist({ user: req.user.id, product: productId });
    await wishlist.save();
    res.status(201).json({ msg:"product added to whishlist", data: wishlist });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

exports.deleteWishlist = async (req, res) => {
  try {
    await Wishlist.findOneAndDelete({ user: req.user.id, product: req.params.id });
    res.status(204).json({  meg: 'Wishlist item deleted' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};
