import React from "react";
import { IProductProps } from "../redux/productSlice";

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
  if (totalCount && totalCount > Number.MAX_SAFE_INTEGER) {
    return (
      <div className="order_result_error">{`상품의 수량은 ${Number.MAX_SAFE_INTEGER}개를 넘을 수 없습니다.`}</div>
    );
  }
  return (
    <>
      <div className="order_result_totalCount">
        <text>{`총 주문 수량: ${totalCount}`}</text>
      </div>
      <div className="order_result_totalPrice">
        <h3>합계</h3>
        <text>{`: ${totalPrice?.toLocaleString()}`}</text>
      </div>
    </>
  );
};

export default OrderResult;
