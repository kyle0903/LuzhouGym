import React, { useState, useEffect, useRef } from "react";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Rating } from "primereact/rating";
import { Tag } from "primereact/tag";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { Toast } from "primereact/toast";
import Navbar from "../components/Navbar";
import { useAuth, useProduct, useNotification } from '../hooks';

function Product() {
  // Hooks
  const { verifyToken } = useAuth();
  const { getAllProducts, addToCart, getCartCount, products, loading } = useProduct();
  const { toastRef, showError, showWarn } = useNotification();
  const isTwiceRef = useRef(false);

  // 狀態
  const [token] = useState(window.localStorage.getItem("token"));
  const [userId, setUserId] = useState(0);
  const [dialogStates, setDialogStates] = useState({});
  const [selectedNum, setSelectedNum] = useState(0);
  const [shopNum, setShopNum] = useState(0);
  const [imageLoaded, setImageLoaded] = useState({});

  const items = Array.from({ length: 100 }).map((_, i) => ({
    label: `${i + 1}`,
    value: i + 1,
  }));

  useEffect(() => {
    if (!isTwiceRef.current) {
      getAllProducts();
      if (token) {
        verifyToken(token).then((data) => {
          if (data === false) {
            setUserId(0);
          } else {
            setUserId(data.id);
          }
        });
      } else {
        setUserId(0);
      }
      isTwiceRef.current = true;
    }
  }, [token, getAllProducts, verifyToken]);

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
      ...prevState,
      [productId]: !prevState[productId],
    }));
  };

  const formatDescription = (std) => {
    if (!std) return "暫無商品規格說明";
    const formattedData = std.replace(/\\n/g, "\n");
    return formattedData;
  };

  const handleImageLoad = (productId) => {
    setImageLoaded((prev) => ({
      ...prev,
      [productId]: true,
    }));
  };

  const handleAddCart = (productId, productName, price, productPic) => {
    if (userId === 0 || !userId) {
      showError("警告", "請至會員中心登入會員帳號");
      return;
    }

    if (selectedNum === 0 || !selectedNum) {
      showWarn("提醒", "請先選擇商品數量");
      return;
    }

    addToCart(
      {
        userId,
        productId,
        productName,
        price,
        productNum: selectedNum,
        productPic,
      },
      async () => {
        const count = await getCartCount(userId);
        setShopNum(count);
        handleDialogToggle(productId);
      }
    );
  };

  return (
    <div>
      <Toast ref={toastRef} position="top-center" />
      <Navbar shopNum={shopNum} setShopNum={setShopNum} />
      <div className="products-container">
        {products.slice(0, 4).map((product) => {
          return (
            <div key={product.id} className="product-card-wrapper">
              <Dialog
                header={product.name}
                visible={dialogStates[product.id]}
                style={{ width: "50vw" }}
                onHide={() => handleDialogToggle(product.id)}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <img
                    src={product.product_pic}
                    alt={product.name}
                    className="product_pic_info"
                  />

                  <div style={{ whiteSpace: "pre-wrap" }}>
                    {formatDescription(product.description)}
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
                      disabled={product.inventoryStatus === "OUTOFSTOCK" || loading}
                      onClick={() =>
                        handleAddCart(
                          product.id,
                          product.name,
                          product.price,
                          product.product_pic
                        )
                      }
                      loading={loading}
                    />
                  </div>
                </div>
              </Dialog>
              <Card
                style={{ cursor: "pointer" }}
                onClick={() => handleDialogToggle(product.id)}
              >
                <div className="product">
                  <div>
                    <i className="pi pi-tag" style={{ fontSize: "1rem" }}></i>
                    <span style={{ fontWeight: "bold", marginLeft: "5px" }}>
                      {product.category}
                    </span>
                  </div>
                  <Tag
                    value={product.inventoryStatus}
                    severity={getSeverity(product)}
                  />
                </div>
                <div className="product-image-container">
                  {!imageLoaded[product.id] && (
                    <div className="product-image-skeleton"></div>
                  )}
                  <img
                    src={product.product_pic}
                    alt={product.name}
                    style={{
                      opacity: imageLoaded[product.id] ? 1 : 0,
                      position: imageLoaded[product.id] ? "static" : "absolute",
                    }}
                    onLoad={() => handleImageLoad(product.id)}
                    loading="lazy"
                  />
                </div>
                <div>
                  <div style={{ marginBottom: "5px", fontWeight: "bold" }}>
                    {product.name}
                  </div>
                  <Rating
                    value={product.rating}
                    readOnly
                    cancel={false}
                    style={{ marginBottom: "5px" }}
                  />
                </div>
                <div className="product">
                  <span
                    style={{
                      fontSize: "1.2rem",
                      fontWeight: "bold",
                      color: "#1069B3",
                    }}
                  >
                    ${product.price}
                  </span>
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
