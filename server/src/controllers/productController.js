const productService = require('../services/productService');

class ProductController {
  /**
   * 取得所有產品
   */
  async getAllProducts(req, res) {
    try {
      const products = await productService.getAllProducts();
      res.json(products);
    } catch (error) {
      res.status(400).json({ status: 'failed', message: error.message });
    }
  }

  /**
   * 加入購物車
   */
  async addToCart(req, res) {
    try {
      const { userId, productId, productName, price, productNum, productPic } = req.body;
      const result = await productService.addToCart({
        userId,
        productId,
        productName,
        price,
        quantity: productNum,
        productPic,
      });
      res.json({ status: 'success', message: '成功加入購物車' });
    } catch (error) {
      res.status(400).json({ status: 'failed', message: error.message });
    }
  }

  /**
   * 取得購物車訂單
   */
  async getCart(req, res) {
    try {
      const { id } = req.params;
      const orders = await productService.getCart(id);
      res.json(orders);
    } catch (error) {
      res.status(400).json({ status: 'failed', message: error.message });
    }
  }

  /**
   * 取得購買記錄（已付款訂單）
   */
  async getPurchaseHistory(req, res) {
    try {
      const { id } = req.params;
      const orders = await productService.getPurchaseHistory(id);
      res.json(orders);
    } catch (error) {
      res.status(400).json({ status: 'failed', message: error.message });
    }
  }

  /**
   * 刪除購物車項目
   */
  async removeFromCart(req, res) {
    try {
      const { cart_id } = req.params;
      await productService.removeFromCart(cart_id);
      res.json({ status: 'success', message: "成功刪除一筆訂單" });

    } catch (error) {
      res.status(400).json({ status: 'failed', message: error.message });
    }
  }
}

module.exports = new ProductController();