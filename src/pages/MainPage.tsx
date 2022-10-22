import React, { useEffect, useState, useCallback } from "react";
// redux
import {
  ItemsProps,
  IProductProps,
  setProductCheck,
  getProductsInStorage,
} from "../redux/productSlice";
import { useAppDispatch, useAppSelector } from "../redux/store";
// custom component
import Product from "../components/Product";
import OrderContent from "../components/OrderContent";
import OrderList from "../components/OrderList";
import OrderResult from "../components/OrderResult";

const MainPage = () => {
  const dispatch = useAppDispatch();
  const productSlice = useAppSelector((state) => state.product);

  const { data } = productSlice;
  const [orders, setOrders] = useState<IProductProps[]>([]);

  useEffect(() => {
    dispatch(getProductsInStorage());
  }, []);

  const handleProductClick = useCallback(
    (list: ItemsProps) => {
      const selectIndex = orders.findIndex((order) => order.id === list.id);
      const checkIndex = data?.findIndex((item) => item.id === list.id);
      if (selectIndex === -1 && checkIndex != undefined) {
        // check product
        const newProducts = { ...data, [checkIndex]: { ...list, check: true } };
        dispatch(setProductCheck(Object.values(newProducts)));
        // add order
        const newOrders = [...orders, { ...list, count: 1 }];
        newOrders.sort((a, b) => a.id - b.id);
        setOrders(newOrders);
      }
    },
    [data],
  );

  const handleOrderUpdate = (list: IProductProps, count: number) => {
    const makeOrdersToArray = (orderList: IProductProps[]) => {
      return Object.values(orderList);
    };
    const selectIndex = orders.findIndex((order) => order.id === list.id);
    // input 입력 값 0 이하 제외, 0이면 1로 변경
    if (selectIndex === -1) return;
    if (count < 0) return;
    if (count === 0) count = 1;
    // order update
    const updateOrders = {
      ...orders,
      [selectIndex]: { ...list, count },
    };
    setOrders(makeOrdersToArray(updateOrders));
  };

  const handleOrderRemove = (id: number) => {
    const checkIndex = data?.findIndex((item) => item.id === id);
    if (data && checkIndex != undefined) {
      // not check product
      const newItem = { ...data[checkIndex] };
      delete newItem.check;
      const newProducts = {
        ...data,
        [checkIndex]: { ...newItem },
      };
      dispatch(setProductCheck(Object.values(newProducts)));
      // remove order
      const newOrders = orders.reduce((res, cur) => {
        if (id === cur.id) {
          return res;
        }
        return [...res, cur];
      }, []);
      setOrders(newOrders);
    }
  };

  return (
    <div className="mainPage">
      <div className="product">
        <Product data={data} onProductClick={handleProductClick} />
      </div>
      <div className="order">
        <h3 className="order_title">주문 목록</h3>
        <OrderContent />
        <div className="order_itemContainer">
          {orders.length ? (
            <>
              {orders.map((order) => (
                <OrderList
                  key={order.id}
                  data={order}
                  onOrderUpdate={handleOrderUpdate}
                  onOrderRemove={handleOrderRemove}
                />
              ))}
            </>
          ) : (
            <div className="order_empty">상품을 추가해주세요.</div>
          )}
        </div>
        <div className="order_result">
          <OrderResult data={orders} />
        </div>
      </div>
    </div>
  );
};

export default MainPage;
