import React from "react";

function Product({ name, price, stock, category, image }) {

  const url = "http://localhost:3000"  + image.split(",")[0]

  return (
    <div>
      <h2>{name}</h2>
      <p>Precio: ${price}</p>
      <p>Stock: {stock}</p>
      <p>Categoría: {category.name}</p>
      <div className="imagen">
        <img style={{ width: "10%" }}
          src={url}
          alt="imagen producto"
        />
      </div>

    </div>
  );
}

export default Product;