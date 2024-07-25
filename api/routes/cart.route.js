const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cart.controller');
const auth=require("../middlewares/auth.middleware");

router.get('/', auth,cartController.getAllCarts);
router.post('/', auth,cartController.createCart);
router.delete('/:id',auth, cartController.deleteCart);

module.exports = router;
