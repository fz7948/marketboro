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
    <div
      data-cy={`${ORDER_CLASS_TYPE.order_list}`}
      className={`${ORDER_CLASS_TYPE.order_list}`}
    >
      <div className={`${ORDER_CLASS_TYPE.order_list_name}`}>{data.name}</div>
      <div
        data-cy="unitName"
        className={`${ORDER_CLASS_TYPE.order_list_unitName}`}
      >
        {data.unitName}
      </div>
      <div
        data-cy="unitPrice"
        className={`${ORDER_CLASS_TYPE.order_list_unitPrice}`}
      >
        {data.unitPrice}
      </div>
      <div className={`${ORDER_CLASS_TYPE.order_list_count}`}>
        <input
          data-cy="input"
          className="order_list_count_input"
          type="number"
          value={data.count}
          onChange={(e) => onOrderUpdate(data, +e.target.value)}
        ></input>
      </div>
      <div className={`${ORDER_CLASS_TYPE.order_list_etc}`}>
        <button
          data-cy="remove_btn"
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
