import React from "react";

function Product({ name, price, stock, category}) {
  return (
    <div>
      <h2>{name}</h2>
      <p>Precio: ${price}</p>
      <p>Stock: {stock}</p>
      <p>Categoría: {category.name}</p>
      

    </div>
  );
}

export default Product;