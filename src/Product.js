import React, { useState, useEffect, useRef } from "react";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Rating } from "primereact/rating";
import { Tag } from "primereact/tag";
import Axios from "axios";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { Toast } from "primereact/toast";
import Navbarr from "./Navbarr";
function Product() {
  //產品資料
  const [products, setProducts] = useState([]);
  //判斷useEffect是否執行兩次
  var isTwice = false;
  //管理每個Dialog的顯示狀態
  const [dialogStates, setDialogStates] = useState({});
  //token
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  //會員id
  const [userId, setUserId] = useState("");
  //商品數量
  const [selectedNum, setSelectedNum] = useState(0);
  const items = Array.from({ length: 100 }).map((_, i) => ({
    label: `${i + 1}`,
    value: i + 1,
  }));
  //通知
  const toastTC = useRef(null);
  //購物車數量
  const [shopNum, setShopNum] = useState(0);
  useEffect(() => {
    if (!isTwice) {
      Axios.get("http://localhost:8081/api/product").then((res) => {
        setProducts(res.data.slice(0, 4));
      });
      if (token) {
        Axios.post("http://localhost:8081/api/token", { token: token }).then(
          (data) => {
            if (data.data == false) {
              console.log("連線過期");
            } else {
              setUserId(data.data.id);
            }
          }
        );
      }

      isTwice = true;
    }
  }, []);
  const getSeverity = (product) => {
    switch (product.inventoryStatus) {
      case "INSTOCK":
        return "success";

      case "LOWSTOCK":
        return "warning";

      case "OUTOFSTOCK":
        return "danger";

      default:
        return null;
    }
  };
  const handleDialogToggle = (productId) => {
    setDialogStates((prevState) => ({
      ...prevState, //因為dialogstate是物件，這邊是複製物件當前所有id的dialog狀態，例如:{1:true,2:false,3:false}
      [productId]: !prevState[productId], // 切換Dialog的顯示狀態
    }));
  };

  const formatDescription = (std) => {
    const formattedData = std.replace(/\\n/g, "\n");
    return formattedData;
  };
  const addCart = (productId, productName, price, productPic) => {
    if (selectedNum !== 0) {
      Axios.post("http://localhost:8081/api/addcart", {
        userId: userId,
        productId: productId,
        productName: productName,
        price: price,
        productNum: selectedNum,
        productPic: productPic,
      }).then((res) => {
        if (res.data.status === "success") {
          Axios.get(`http://localhost:8081/api/order/${userId}`).then((res) => {
            setShopNum(res.data.length);
          });
          handleDialogToggle(productId);
          toastTC.current.show({
            severity: "success",
            summary: "通知",
            detail: "已加到購物車",
            life: 3000,
          });
        }
      });
    } else {
      console.log("no");
    }
  };

  return (
    <div>
      <Navbarr shopNum={shopNum} setShopNum={setShopNum} />
      <Toast ref={toastTC} position="top-center" />
      <div style={{ display: "flex" }}>
        {products.map((product) => {
          return (
            <div>
              <Dialog
                header={product.name}
                visible={dialogStates[product.id]} // 使用物件來取得對應的Dialog顯示狀態
                style={{ width: "50vw" }}
                onHide={() => handleDialogToggle(product.id)} // 切換Dialog的顯示狀態
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <img
                    src={`https://primefaces.org/cdn/primereact/images/product/${product.image}`}
                    alt={product.name}
                    className="product_pic_info"
                  />

                  <div style={{ whiteSpace: "pre-wrap" }}>
                    {formatDescription(product.standard)}
                  </div>
                </div>
                <div className="btn_shop">
                  庫存數量：{product.quantity}
                  <div>
                    <Dropdown
                      value={selectedNum}
                      onChange={(e) => setSelectedNum(e.value)}
                      options={items}
                      placeholder="Select Item"
                      className="w-full md:w-14rem"
                      style={{ marginRight: "15px" }}
                    />
                    <Button
                      icon="pi pi-cart-plus"
                      className="p-button-rounded"
                      disabled={product.inventoryStatus === "OUTOFSTOCK"}
                      onClick={() =>
                        addCart(
                          product.id,
                          product.name,
                          product.price,
                          product.image
                        )
                      }
                    ></Button>
                  </div>
                </div>
              </Dialog>
              <Card
                style={{ margin: "14px", cursor: "pointer" }}
                onClick={() => handleDialogToggle(product.id)}
              >
                <div className="product">
                  <div>
                    <i className="pi pi-tag" style={{ fontSize: "1rem" }}></i>
                    <span style={{ fontWeight: "bold" }}>
                      {product.category}
                    </span>
                  </div>
                  <Tag
                    value={product.inventoryStatus}
                    severity={getSeverity(product)}
                  ></Tag>
                </div>
                <div>
                  <img
                    src={`https://primefaces.org/cdn/primereact/images/product/${product.image}`}
                    alt={product.name}
                    style={{ marginTop: "10px", marginBottom: "10px" }}
                  />
                  <div style={{ marginBottom: "5px", fontWeight: "bold" }}>
                    {product.name}
                  </div>
                  <Rating
                    value={product.rating}
                    readOnly
                    cancel={false}
                    style={{ marginBottom: "5px" }}
                  ></Rating>
                </div>
                <div className="product">
                  <span>${product.price}</span>
                </div>
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Product;
