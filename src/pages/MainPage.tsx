import React, { useEffect, useState } from "react";
import items from "../data/items.json";
import OrderList from "../components/OrderList";
import OrderResult from "../components/OrderResult";
import { ItemsProps } from "./main";

export interface IProductProps extends ItemsProps {
  count: number;
}

const MainPage = () => {
  const [orders, setOrders] = useState<IProductProps[]>([]);

  const makeOrdersToArray = (orderList: IProductProps[]) => {
    return Object.values(orderList);
  };

  const handleProductClick = (list: ItemsProps) => {
    const selectIndex = orders.findIndex((order) => order.name === list.name);
    if (selectIndex !== -1) {
      const updateOrders = {
        ...orders,
        [selectIndex]: { ...list, count: orders[selectIndex].count + 1 },
      };
      setOrders(makeOrdersToArray(updateOrders));
    } else {
      const newOrders = [...orders, { ...list, count: 1 }];
      newOrders.sort((a, b) => a.id - b.id);
      setOrders(newOrders);
    }
  };

  const handleOrderUpdate = (list: IProductProps, count: number) => {
    const selectIndex = orders.findIndex((order) => order.name === list.name);
    if (selectIndex === -1) return;
    if (count < 0) return;
    if (count === 0) count = 1;
    const updateOrders = {
      ...orders,
      [selectIndex]: { ...list, count },
    };
    setOrders(makeOrdersToArray(updateOrders));
  };

  const handleOrderRemove = (name: string) => {
    const newOrders = orders.reduce((res, cur) => {
      if (name === cur.name) {
        return res;
      }
      return [...res, cur];
    }, []);
    setOrders(newOrders);
  };

  // items 리스트가 없을때 로직도 추가해야함
  return (
    <div className="mainPage">
      <div className="product">
        {items.map((list) => (
          <button
            className="product_item"
            key={list.name}
            onClick={() => handleProductClick(list)}
          >
            {list.name}
          </button>
        ))}
      </div>
      <div className="order">
        <h3 className="order_title">주문 목록</h3>
        <OrderList head />
        <div className="order_itemContainer">
          {orders.map((order) => (
            <OrderList
              key={order.name}
              data={order}
              head={false}
              onOrderUpdate={handleOrderUpdate}
              onOrderRemove={handleOrderRemove}
            />
          ))}
        </div>
        <div className="order_result">
          <OrderResult data={orders} />
        </div>
      </div>
    </div>
  );
};

export default MainPage;
