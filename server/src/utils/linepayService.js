const axios = require('axios');
const { HmacSHA256 } = require('crypto-js');
const Base64 = require('crypto-js/enc-base64');
const config = require('../config/env');

class LinepayService {
  constructor() {
    this.channelId = config.linepay.channelId;
    this.channelSecret = config.linepay.channelSecret;
    this.version = config.linepay.version;
    this.site = config.linepay.site;
    this.returnHost = config.linepay.returnHost;
    this.returnConfirmUrl = config.linepay.returnConfirmUrl;
    this.returnCancelUrl = config.linepay.returnCancelUrl;
  }

  /**
   * 建立簽章
   */
  createSignature(body, uri) {
    const nonce = parseInt(new Date().getTime() / 1000);
    const message = `${this.channelSecret}/${this.version}${uri}${JSON.stringify(body)}${nonce}`;
    const signature = Base64.stringify(HmacSHA256(message, this.channelSecret));

    return {
      'X-LINE-ChannelId': this.channelId,
      'Content-Type': 'application/json',
      'X-LINE-Authorization-Nonce': nonce,
      'X-LINE-Authorization': signature,
    };
  }

  /**
   * 發起支付請求
   */
  async requestPayment(orderData) {
    try {
      const uri = '/payments/request';
      const body = {
        amount: orderData.amount,
        currency: 'TWD',
        orderId: orderData.orderId,
        packages: orderData.packages,
        redirectUrls: {
          confirmUrl: `${this.returnHost}${this.returnConfirmUrl}`,
          cancelUrl: `${this.returnHost}${this.returnCancelUrl}`,
        },
      };

      const headers = this.createSignature(body, uri);
      const url = `${this.site}/${this.version}${uri}`;

      const response = await axios.post(url, body, { headers });

      if (response.data.returnCode === '0000') {
        return {
          success: true,
          paymentUrl: response.data.info.paymentUrl.web,
          transactionId: response.data.info.transactionId,
        };
      }

      throw new Error(`LINE Pay request failed: ${response.data.returnMessage}`);
    } catch (error) {
      console.error('❌ LINE Pay request error:', error);
      throw error;
    }
  }

  /**
   * 確認支付
   */
  async confirmPayment(transactionId, amount) {
    try {
      const uri = `/payments/${transactionId}/confirm`;
      const body = {
        amount,
        currency: 'TWD',
      };

      const headers = this.createSignature(body, uri);
      const url = `${this.site}/${this.version}${uri}`;

      const response = await axios.post(url, body, { headers });

      if (response.data.returnCode === '0000') {
        return {
          success: true,
          data: response.data.info,
        };
      }

      throw new Error(`LINE Pay confirm failed: ${response.data.returnMessage}`);
    } catch (error) {
      console.error('❌ LINE Pay confirm error:', error);
      throw error;
    }
  }
}

module.exports = new LinepayService();
