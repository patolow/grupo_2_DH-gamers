import React, { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";


function UltimoCargado() {

  const [ultimoCargado, setUltimoCargado] = useState({})
  const [loadingUltimoCargado, setLoadingUltimoCargado] = useState(false)

  // const image= ultimoCargado.sliderImage
  // const urlImagen = "http://localhost:3000"  + image.split(",")[0]

  useEffect(() => {
    setLoadingUltimoCargado(true)
    fetch("http://localhost:3000/dashboard/products")
      .then((response) => response.json())
      .then((data) => {
        const products = data.data;
        // Guardar el último producto cargado en el estado.
        setUltimoCargado(products[products.length - 1]);
      })
      .catch((error) => console.log(error))
      .finally(() => setLoadingUltimoCargado(false))
  }, []);

  if (loadingUltimoCargado) {
    return (
      <div className="ultimo-producto-cargado-container">
        <div className='spinner-ultimo-cargado'>
          <ClipLoader
            loading={loadingUltimoCargado}
            size={40}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      </div>
    )
  }
  return (


    <div className="ultimo-producto-cargado-container">
      <div className="ultimo-producto-cargado">
        <div className="ultimo-producto-cargado-info">
          <h1>ÚLTIMO PRODUCTO CARGADO</h1>
          <li><b>ID</b>: {ultimoCargado.id}</li>
          <li><b>Nombre</b>: {ultimoCargado.name}</li>
          <li><b>Precio</b>: {ultimoCargado.price}</li>
          <li><b>Stock</b>: {ultimoCargado.stock}</li>
          <li><b>Categoría</b>: {ultimoCargado.category ? ultimoCargado.category.name : ''}</li>
        </div>
        <div className="ultimo-producto-cargado-imagen">
          {ultimoCargado.sliderImage && (
            <div className="ultimo-producto-cargado-imagen">
              <img src={`http://localhost:3000${ultimoCargado.sliderImage.split(",")[0]}`} />
            </div>
          )}
        </div>
      </div>
    </div>

  )
}

export default UltimoCargado;