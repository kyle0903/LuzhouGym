import React, { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { Toast } from "primereact/toast";
import { usePayment, useNotification } from "../hooks";
import { getHomeUrl } from "../services/api";

function Pay() {
  // Hooks
  const location = useLocation();
  const { confirmLinePay } = usePayment();
  const { toastRef } = useNotification();
  const isTwiceRef = useRef(false);

  const searchParams = new URLSearchParams(location.search);
  const transactionId = searchParams.get("transactionId");
  const orderId = searchParams.get("orderId");

  useEffect(() => {
    if (!isTwiceRef.current) {
      confirmLinePay({ transactionId, orderId }, () => {
        setTimeout(() => {
          window.location.replace(`${getHomeUrl()}/`);
        }, 1000);
      });
      isTwiceRef.current = true;
    }
  }, [transactionId, orderId, confirmLinePay]);

  return (
    <div>
      <Toast ref={toastRef} position="top-center" />
    </div>
  );
}

export default Pay;
