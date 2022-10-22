import React, { memo } from "react";
import { ORDER_CLASS_TYPE } from "../share/type";

const OrderContent = () => {
  return (
    <div
      className={`${ORDER_CLASS_TYPE.order_list}`}
      style={{ background: "#eee8aa" }}
    >
      <div className={`${ORDER_CLASS_TYPE.order_list_name}`}>상품명</div>
      <div className={`${ORDER_CLASS_TYPE.order_list_unitName}`}>단위</div>
      <div className={`${ORDER_CLASS_TYPE.order_list_unitPrice}`}>단가</div>
      <div className={`${ORDER_CLASS_TYPE.order_list_count}`}>수량</div>
      <div className={`${ORDER_CLASS_TYPE.order_list_etc}`} />
    </div>
  );
};

export default memo(OrderContent);
