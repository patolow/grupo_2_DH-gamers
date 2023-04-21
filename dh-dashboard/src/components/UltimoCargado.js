import React, { useEffect, useState } from "react";


    function UltimoCargado (){
       

const [ultimoCargado, setUltimoCargado] = useState({})
// const image= ultimoCargado.sliderImage
// const urlImagen = "http://localhost:3000"  + image.split(",")[0]

useEffect(() => {

fetch("http://localhost:3000/dashboard/products")
.then((response) => response.json())
.then((data) => {
  const products = data.data;
  // Guardar el último producto cargado en el estado.
  setUltimoCargado(products[products.length - 1]);
})
.catch((error) => console.log(error));
}, []);

    return (
        
            
<div className="ultimo-producto-cargado-container">
        <div className="ultimo-producto-cargado">
          <div className="ultimo-producto-cargado-info">
          <h1>ÚLTIMO PRODUCTO CARGADO</h1>
          <p><b>ID</b>: {ultimoCargado.id}</p>
          <p><b>Nombre</b>: {ultimoCargado.name}</p>
          <p><b>Precio</b>: {ultimoCargado.price}</p>
          <p><b>Stock</b>: {ultimoCargado.stock}</p>
          <p><b>Categoría</b>: {ultimoCargado.category ? ultimoCargado.category.name : ''}</p>
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