import React from "react";
import { IProductProps } from "../pages/MainPage";

interface IOrderResultProps {
  data?: IProductProps[];
}

const OrderResult = (props: IOrderResultProps) => {
  const { data } = props;
  const totalCount = data?.reduce((res, cur) => {
    return res + cur.count;
  }, 0);
  const totalPrice = data?.reduce((res, cur) => {
    return res + cur.unitPrice * cur.count;
  }, 0);
  return (
    <>
      <div className="order_result_totalCount">{`총 주문 수량: ${totalCount}`}</div>
      <div className="order_result_totalPrice">
        <h3>합계</h3>
        <div>{`: ${totalPrice?.toLocaleString()}`}</div>
      </div>
    </>
  );
};

export default OrderResult;
