import Axios from "axios";
import React, { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { Toast } from "primereact/toast";
import { API_ENDPOINTS } from './config/api';
function Pay() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const transactionId = searchParams.get("transactionId");
  const orderId = searchParams.get("orderId");
  //通知
  const toastTC = useRef(null);
  let isTwice = false;
  useEffect(() => {
    if (!isTwice) {
      Axios.post(`${API_ENDPOINTS.LINEPAY}/confirm`, {
        transactionId: transactionId,
        orderId: orderId,
      }).then((res) => {
        if (res.data.status === "success") {
          toastTC.current.show({
            severity: "success",
            summary: "通知",
            detail: res.data.message,
            life: 3000,
          });
          setTimeout(() => {
            window.location.replace(`${API_ENDPOINTS.HOME}/`);
          }, 1000);
        }
      });
      isTwice = true;
    }
  }, []);

  return (
    <div>
      <Toast ref={toastTC} position="top-center" />
    </div>
  );
}

export default Pay;
