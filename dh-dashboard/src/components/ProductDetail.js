import React, { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";


function ProductDetail() {

  const [productDetail, setProductDetail] = useState({})
  const [loadingDetail, setLoadingDetail] = useState(false)
  const searchParams = new URLSearchParams(window.location.search)
  const id = searchParams.get('id');

  useEffect(() => {
    console.log('aca')
    setLoadingDetail(true)
    fetch(`http://localhost:3000/dashboard/product/${id}`)
      .then((response) => response.json())
      .then((productDetail) => setProductDetail(productDetail.data))
      .catch((error) => console.log(error))
      .finally(() => setLoadingDetail(false))
  }, [id]);

  if (loadingDetail) {
    return (
      <>
        <div className='header-dashboard'>
          <h1>DETALLE PRODUCTO</h1>
        </div>
        <div className="ultimo-producto-cargado-container">
          <div className='spinner-ultimo-cargado'>
            <ClipLoader
              loading={loadingDetail}
              size={40}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
        </div>
      </>
    )
  }
  return (
    <>
      <div className='header-dashboard'>
        <h1>DETALLE PRODUCTO</h1>
      </div>
      <div className="ultimo-producto-cargado-container">
        <div className="ultimo-producto-cargado">
          <div className="ultimo-producto-cargado-info">
            <h1>{productDetail.name} </h1>
            <li><b>ID</b>: {productDetail.id}</li>
            <li><b>Precio</b>: {productDetail.price}</li>
            <li><b>Stock</b>: {productDetail.stock}</li>
            <li><b>Categoría</b>: {productDetail.category ? productDetail.category.name : ''}</li>
          </div>
          <div className="ultimo-producto-cargado-imagen">
            {productDetail.sliderImage && (
              <div className="ultimo-producto-cargado-imagen">
                <img src={`http://localhost:3000${productDetail.sliderImage.split(",")[0]}`} alt="img" />
              </div>
            )}
          </div>
        </div>  
      </div>
    </>
  )
}

export default ProductDetail;