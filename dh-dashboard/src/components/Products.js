import React, {useEffect} from "react";
import Product from "./Product";

function Products(products) {
  products = [{name: 'monitor', price: '9000'}, {name: 'mouse', price: '1000'}]

  return (
    <div>
      <h2>Products:</h2>
      {products.map((product, index) => (
        <Product key={index} name={product.name} price={product.price} />
      ))}
    </div>
  );
}

export default Products;
