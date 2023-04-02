const express = require("express");
const db = require("../database/models")

const controller = {

  addItem: (req, res) => {

    console.log(req.body)
    
    // guardar los datos del producto en la base de datos
    db.Cart.create({
      "productId": req.body[req.body.length -1].id,
      "productName": req.body[req.body.length -1].name,
      "productPrice": req.body[req.body.length -1].price,
    })
    
      .then(() => {
        return res.status(200).send('Producto agregado al carrito'); // enviar una respuesta satisfactoria al cliente y detener la ejecución
      })
      .catch((error) => {
        console.error(error);
        return res.status(500).send('Error al agregar el producto al carrito'); // enviar una respuesta de error al cliente y detener la ejecución
      });
  },

  getProductCart: (req, res) => { 
    res.render("productCart") 
  },


}

module.exports = controller
