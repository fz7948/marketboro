import React, { useMemo } from "react";
import items from "../data/items.json";

console.log(items, "items ?");

const MainPage = () => {
  const orderTitle = useMemo(() => {
    return <h3 className="order_title">주문 목록</h3>;
  }, []);
  const columns = useMemo(
    () => [
      {
        accessor: "name",
        Header: "Name",
      },
      {
        accessor: "email",
        Header: "Email",
      },
      {
        accessor: "phone",
        Header: "Phone",
      },
    ],
    [],
  );
  return (
    <div className="mainPage">
      <div className="product">
        {items.map((list) => (
          <div key={list.name} className="product_item">
            {list.name}
          </div>
        ))}
      </div>
      <div className="order">{orderTitle}</div>
    </div>
  );
};

export default MainPage;
