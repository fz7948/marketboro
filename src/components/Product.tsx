import React from "react";
import { ItemsProps } from "../redux/productSlice";

interface IProductProps {
  data?: ItemsProps[];
  onProductClick: (list: ItemsProps) => void;
}

const Product = (props: IProductProps) => {
  const { data, onProductClick } = props;
  return (
    <>
      {data &&
        data.map((list) => (
          <React.Fragment key={list.id}>
            {list.check ? (
              <button
                data-cy="product_check"
                className="product_item product_check"
              >
                {list.name}
              </button>
            ) : (
              <button
                data-cy="product_unCheck"
                className="product_item"
                onClick={() => onProductClick(list)}
              >
                {list.name}
              </button>
            )}
          </React.Fragment>
        ))}
    </>
  );
};

export default Product;
