import React from "react";
import { IProductProps } from "../redux/productSlice";
import { ORDER_CLASS_TYPE } from "../share/type";

import { GoX } from "react-icons/go";

interface IOrderListProps {
  data: IProductProps;
  onOrderUpdate: (list: IProductProps, count: number) => void;
  onOrderRemove: (id: number) => void;
}

const OrderList = (props: IOrderListProps) => {
  const { data, onOrderUpdate, onOrderRemove } = props;
  return (
    <div className={`${ORDER_CLASS_TYPE.order_list}`}>
      <div className={`${ORDER_CLASS_TYPE.order_list_name}`}>{data.name}</div>
      <div className={`${ORDER_CLASS_TYPE.order_list_unitName}`}>
        {data.unitName}
      </div>
      <div className={`${ORDER_CLASS_TYPE.order_list_unitPrice}`}>
        {data.unitPrice}
      </div>
      <div className={`${ORDER_CLASS_TYPE.order_list_count}`}>
        <input
          className="order_list_count_input"
          type="number"
          value={data.count}
          onChange={(e) => onOrderUpdate(data, +e.target.value)}
        ></input>
      </div>
      <div className={`${ORDER_CLASS_TYPE.order_list_empty}`}>
        <button
          className="order_list_btn"
          onClick={() => onOrderRemove(data.id)}
        >
          <GoX size="19" fill="#fff" />
        </button>
      </div>
    </div>
  );
};

export default OrderList;
