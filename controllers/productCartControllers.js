const express = require("express");
const db = require("../database/models")

const controller = {

  addItem: (req, res) => {

    console.log("Llegó una solicitud POST a la ruta /cart")
    
    // guardar los datos del producto en la base de datos
    // db.Cart.create({
    //   "productId": req.body.id,
    //   "name": req.body.name,
    //   "price": req.body.price,
    // })
    //   .then(() => {
    //     res.status(200).send('Producto agregado al carrito'); // enviar una respuesta satisfactoria al cliente
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //     res.status(500).send('Error al agregar el producto al carrito'); // enviar una respuesta de error al cliente
    //   });
  },

  getProductCart: (req, res) => { 
    res.render("productCart") 
  },


}

module.exports = controller
