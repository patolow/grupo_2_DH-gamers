import React, { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import Product from "./Product";

function Products() {
  const [products, setProducts] = useState(null)
  const [loadingProducts, setLoadingProducts] = useState(false)

  useEffect(() => {
    setLoadingProducts(true)
    console.log("rendering")
    fetch("http://localhost:3000/dashboard/products")
      .then((response) => response.json())
      .then((products) => setProducts(products.data, products.total))
      .catch((error) => console.log(error)) 
      .finally(() => setLoadingProducts(false))
  }, []);
  
  if (loadingProducts) {
    return (
      <div className="ultimo-producto-cargado-container">
        <div className='spinner-ultimo-cargado'>
          <ClipLoader
            loading={loadingProducts}
            size={40}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      </div>
    )
  }

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
              image={product.sliderImage}
              id={product.id}
            />
          </div>

        ))}
    </div>
  );
}

export default Products;
