const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// 取得所有產品
router.get('/product', productController.getAllProducts.bind(productController));

// 加入購物車
router.post('/addcart', productController.addToCart.bind(productController));

// 取得購物車訂單
router.get('/order/:id', productController.getCart.bind(productController));

// 刪除購物車項目
router.delete('/order/delete/:cart_id', productController.removeFromCart.bind(productController));

module.exports = router;