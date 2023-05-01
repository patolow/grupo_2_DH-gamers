import React from "react";
import { Link } from "react-router-dom"

function Product({ name, price, stock, category, image, id }) {

  const url = "http://localhost:3000" + image.split(",")[0]
  const urlProduct = "/product/detail?id=" + id

  return (
    <Link className="product-link" to={urlProduct} replace>
      <div className="container-datos">
        <div className="datos-texto">
          <h2>{name}</h2>
          <p>Precio: ${price}</p>
          <p>Stock: {stock}</p>
          <p>Categoría: {category.name}</p>
        </div>
        <div className="datos-imagen">
          <img
            src={url}
            alt="imagen producto"
          />
        </div>
      </div>
    </Link>
  );
}

export default Product;