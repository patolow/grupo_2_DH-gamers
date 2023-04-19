import React, { useEffect, useState } from "react";
import Product from "./Product";

function Products() {
  const [products, setProducts] = useState(null)

  useEffect(() => {
    console.log("rendering")
    fetch("http://localhost:3000/dashboard/products")
      .then((response) => response.json())
      .then((products) => setProducts(products.data, products.total))
      .catch((error) => console.log(error));
      
  }, []);

  return (
    <div className="container-dashboard">
      <h2>Todos los productos: </h2>
      
      {products &&
      
        products.map((product, index) => (
          
          <div className="dashboard-division">
          <Product 
          key={index} 
          name={product.name} 
          price={product.price}
          stock={product.stock}
          category={product.category} 
          />
          </div>
          
        ))}
    </div>
  );
}

export default Products;
