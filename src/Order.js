import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import Navbarr from "./Navbarr";
import Axios from "axios";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { API_ENDPOINTS } from './config/api';
function Order() {
  //會員id
  const { id } = useParams();
  //購物車數量
  const [shopNum, setShopNum] = useState(0);
  //訂單資料
  const [orders, setOrders] = useState([]);
  //判斷結帳按鈕的display
  const [shopBtn, setShopBtn] = useState("inline-flex");
  //加購物車的字串
  const [cartString, setCartString] = useState("");
  //通知
  const toastTC = useRef(null);
  var twice = false;
  useEffect(() => {
    if (!twice) {
      Load();
      twice = true;
    }
  }, []);
  function Load() {
    Axios.get(`${API_ENDPOINTS.ORDER}/${id}`).then((res) => {
      setOrders(res.data);
      let shopNums = res.data.length; //因為同步問題，如果直接setShopNum會比其他同步時間慢，無法獲得想要的shopNum值
      setShopNum(shopNums);
      if (shopNums === 0) {
        setShopBtn("none");
        setCartString("目前該帳戶查無訂單，請到公司產品頁面購買商品");
      } else {
        setShopBtn("inline-flex");
      }
      console.log(res.data);
    });
  }

  function CheckOut() {
    Axios.get(`${API_ENDPOINTS.LINEPAY}/${id}`).then((res) => {
      if (res.data.status === "success") {
        window.location.replace(res.data.urls);
      }
    });
  }
  function DeleteOrder(cart_id) {
    Axios.delete(`${API_ENDPOINTS.ORDER}/delete/${cart_id}`).then(
      (res) => {
        if (res.data.status === "success") {
          toastTC.current.show({
            severity: "success",
            summary: "通知",
            detail: res.data.message,
            life: 3000,
          });
          Load();
        }
      }
    );
  }

  return (
    <div>
      <Toast ref={toastTC} position="top-center" />
      <Navbarr shopNum={shopNum} setShopNum={setShopNum} />
      {shopNum !== 0 ? (
        <div>
          <h3 style={{ textAlign: "center", marginTop: "30px" }}>訂單資料</h3>
          {orders.map((order) => {
            return (
              <div>
                <Card className="order_card">
                  <div style={{ display: "flex" }}>
                    <img
                      src={`https://primefaces.org/cdn/primereact/images/product/${order.product_pic}`}
                      style={{
                        marginTop: "10px",
                        marginBottom: "10px",
                        borderRadius: "10%",
                      }}
                    />
                    <div
                      style={{
                        fontWeight: "bold",
                        marginTop: "5px",
                        marginLeft: "50px",
                      }}
                    >
                      <p
                        style={{
                          fontSize: "1.5rem",
                        }}
                      >
                        {order.product_name}
                      </p>
                      <p style={{ fontSize: "1rem" }}>
                        訂單編號：{order.cart_id}
                        <br />
                        訂購人：{order.user}
                        <br />
                        單品價格：{order.product_price} 元<br />
                        訂購數量：{order.quantity} 件<br />
                      </p>
                      <p style={{ marginTop: "50px" }}>
                        該筆訂單金額：
                        <span style={{ color: "red" }}>{order.total}元</span>
                      </p>
                    </div>
                    <div
                      style={{
                        position: "absolute",
                        right: "20px",
                        height: "250px",
                      }}
                    >
                      <Button
                        label="刪除"
                        style={{ height: "100%" }}
                        severity="danger"
                        onClick={() => DeleteOrder(order.cart_id)}
                      />
                    </div>
                  </div>
                </Card>
              </div>
            );
          })}
          <div
            style={{
              position: "relative",
              textAlign: "right",
              marginRight: "170px",
              marginTop: "50px",
              marginBottom: "10px",
            }}
          >
            <Button
              label="結帳去"
              onClick={CheckOut}
              style={{ display: shopBtn }}
            />
          </div>
        </div>
      ) : (
        <div style={{ textAlign: "center", marginTop: "20px", color: "gray" }}>
          <b>{cartString}</b>
        </div>
      )}
    </div>
  );
}

export default Order;
