import React, { useEffect, useState } from "react";
import Product from "./Product";

function Products() {
  const [products, setProducts] = useState(null)

  useEffect(() => {
    console.log("rendering")
    fetch("http://localhost:3000/dashboard/products")
      .then((response) => response.json())
      .then((products) => setProducts(products.data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      <h2>Products:</h2>
      {products &&
        products.map((product, index) => (
          <Product key={index} name={product.name} price={product.price} />
        ))}
    </div>
  );
}

export default Products;
