import React, { useEffect, useState } from "react";
import Product from "./Product";

function Products(products) {
  const [data, setData] = useState(null)

  useEffect(() => {
    fetch("http://localhost:3000/api/products")
      .then( res => res.json())
      .then (data => setData(data))
  }, [])

  return (
    <div>
      <h2>Products:</h2>
      {data.map((product, index) => (
        <Product key={index}
         name={product.name} price={product.price} />
      ))}
    </div>
  );
}

export default Products;
