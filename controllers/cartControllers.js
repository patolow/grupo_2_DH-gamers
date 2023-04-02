const express = require("express");
const db = require("../database/models")

const controller = {

  addItem: (req, res) => {

    console.log(req.body)
    
    // guardar los datos del ultimo producto en la base de datos
    db.Cart.create({
      "productId": req.body[req.body.length -1].id,
      "productName": req.body[req.body.length -1].name,
      "productPrice": req.body[req.body.length -1].price,
      "productCategory": req.body[req.body.length -1].category,
      "productStock": req.body[req.body.length -1].stock,
      "productImage": req.body[req.body.length -1].image,
      // "userId": 'no se como registrar el id de la persona que agregar el producto'

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

    db.Cart.findAll()
    
      .then(items => {

        let carrito = []
        items.forEach( item => {
          const producto = {
            "productId" : item.dataValues.productId,
            "productName" : item.dataValues.productName,
            "productPrice" : item.dataValues.productPrice,
            "productCategory" : item.dataValues.productCategory,
            "productStock" : item.dataValues.productStock,
            "productImage" : item.dataValues.productImage,

            // "quantity": 'no se como calcular duplicados aun'
          };
          carrito.push(producto); 
        })
        // console.log(carrito)
        res.render("productCart.ejs", {carrito})
        
        })
        
        
        
  }

}

module.exports = controller
