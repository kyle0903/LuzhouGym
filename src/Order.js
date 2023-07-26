import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbarr from "./Navbarr";
import Axios from "axios";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
function Order() {
  //會員id
  const { id } = useParams();
  //購物車數量
  const [shopNum, setShopNum] = useState(0);
  //訂單資料
  const [orders, setOrders] = useState([]);
  //帳戶名稱
  const [user, setUser] = useState("");
  var twice = false;
  useEffect(() => {
    if (!twice) {
      Axios.get(`http://localhost:8081/api/order/${id}`).then((res) => {
        setOrders(res.data);
        console.log(res.data);
      });
      twice = true;
    }
  }, []);
  function test() {
    Axios.get(`http://localhost:8081/api/linepay/${id}`).then((res) => {
      if (res.data.status === "success") {
        window.location.replace(res.data.urls);
      }
    });
  }
  return (
    <div>
      <Navbarr shopNum={shopNum} setShopNum={setShopNum} />
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
                      訂單編號：{order.order_id}
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
          <Button label="結帳去" onClick={test} />
        </div>
      </div>
    </div>
  );
}

export default Order;
