import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { useOrder, usePayment, useNotification } from "../hooks";

function Order() {
  // Hooks
  const { id } = useParams();
  const { getOrders, deleteOrder, orders, loading: orderLoading } = useOrder();
  const { initiateLinePay, loading: paymentLoading } = usePayment();
  const { toastRef } = useNotification();
  const twiceRef = useRef(false);

  // 狀態
  const [shopNum, setShopNum] = useState(0);
  const [shopBtn, setShopBtn] = useState("inline-flex");
  const [cartString, setCartString] = useState("");

  const loading = orderLoading || paymentLoading;

  useEffect(() => {
    if (!twiceRef.current) {
      loadOrders();
      twiceRef.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadOrders = async () => {
    const data = await getOrders(id);
    if (data) {
      const shopNums = data.length;
      setShopNum(shopNums);
      if (shopNums === 0) {
        setShopBtn("none");
        setCartString("目前該帳戶查無訂單，請到公司產品頁面購買商品");
      } else {
        setShopBtn("inline-flex");
      }
    }
  };

  const handleCheckOut = async () => {
    const paymentUrl = await initiateLinePay(id);
    if (paymentUrl) {
      window.location.replace(paymentUrl);
    }
  };

  const handleDeleteOrder = (cart_id) => {
    deleteOrder(cart_id, () => {
      loadOrders();
    });
  };

  return (
    <div>
      <Toast ref={toastRef} position="top-center" />
      <Navbar shopNum={shopNum} setShopNum={setShopNum} />
      {shopNum !== 0 ? (
        <div>
          <h3 style={{ textAlign: "center", marginTop: "30px" }}>訂單資料</h3>
          {orders.map((order) => {
            return (
              <div key={order.cart_id}>
                <Card className="order_card">
                  <div style={{ display: "flex" }}>
                    <img
                      src={`${order.product_pic}`}
                      alt={order.product_name}
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
                        onClick={() => handleDeleteOrder(order.cart_id)}
                        disabled={loading}
                        loading={orderLoading}
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
              onClick={handleCheckOut}
              style={{ display: shopBtn }}
              disabled={loading}
              loading={paymentLoading}
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
