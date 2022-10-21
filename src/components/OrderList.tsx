import React from "react";
import { IProductProps } from "../pages/MainPage";
import { GoX } from "react-icons/go";

interface IOrderListProps {
  data?: IProductProps;
  head: boolean;
  onOrderUpdate?: (list: IProductProps, count: number) => void;
  onOrderRemove?: (name: string) => void;
}

const orderClassType = {
  ORDER_LIST: "order_list",
  ORDER_LIST_NAME: "order_list_name",
  ORDER_LIST_UNITNAME: "order_list_unitName",
  ORDER_LIST_UNITPRICE: "order_list_unitPrice",
  ORDER_LIST_COUNT: "order_list_count",
  ORDER_LIST_EMPTY: "order_list_empty",
};

const OrderList = (props: IOrderListProps) => {
  const { data, head, onOrderUpdate, onOrderRemove } = props;
  if (head || !data || !onOrderUpdate || !onOrderRemove) {
    return (
      <div
        className={`${orderClassType.ORDER_LIST}`}
        style={{ background: "#eee8aa" }}
      >
        <div className={`${orderClassType.ORDER_LIST_NAME}`}>상품명</div>
        <div className={`${orderClassType.ORDER_LIST_UNITNAME}`}>단위</div>
        <div className={`${orderClassType.ORDER_LIST_UNITPRICE}`}>단가</div>
        <div className={`${orderClassType.ORDER_LIST_COUNT}`}>수량</div>
        <div className={`${orderClassType.ORDER_LIST_EMPTY}`} />
      </div>
    );
  }
  return (
    <div className={`${orderClassType.ORDER_LIST}`}>
      <div className={`${orderClassType.ORDER_LIST_NAME}`}>{data.name}</div>
      <div className={`${orderClassType.ORDER_LIST_UNITNAME}`}>
        {data.unitName}
      </div>
      <div className={`${orderClassType.ORDER_LIST_UNITPRICE}`}>
        {data.unitPrice}
      </div>
      <div className={`${orderClassType.ORDER_LIST_COUNT}`}>
        <input
          className="order_list_count_input"
          type="number"
          value={data.count}
          onChange={(e) => onOrderUpdate(data, +e.target.value)}
        ></input>
      </div>
      <div className={`${orderClassType.ORDER_LIST_EMPTY}`}>
        <button
          className="order_list_btn"
          onClick={() => onOrderRemove(data.name)}
        >
          <GoX size="19" fill="#fff" />
        </button>
      </div>
    </div>
  );
};

export default OrderList;
