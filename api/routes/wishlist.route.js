const express = require('express');
const router = express.Router();
const wishlistController = require('../controllers/wishlist.controller');
const auth=require("../middlewares/auth.middleware");

router.get('/', auth ,wishlistController.getAllWishlists);
router.post('/', auth , wishlistController.createWishlist);
router.delete('/:id', auth ,wishlistController.deleteWishlist);

module.exports = router;
