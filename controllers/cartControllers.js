const express = require("express");
const db = require("../database/models");

const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  port: 3306,
  dialect: 'mysql',
  logging: false, // establecer en true para ver los registros de SQL en la consola
});

const controller = {

  addItemtoCart: (req, res) => {

    // guardar los datos del último producto en la base de datos
    db.Cart.create({
      "productId": req.body[req.body.length - 1].id,
      "productName": req.body[req.body.length - 1].name,
      "productPrice": req.body[req.body.length - 1].price,
      "productCategory": req.body[req.body.length - 1].category,
      "productStock": req.body[req.body.length - 1].stock,
      "productImage": req.body[req.body.length - 1].image,
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

  getCart: (req, res) => {
    //tomo la base de datos exluyendo duplicados
    db.Cart.findAll({
      attributes: [
        'productId',
        'productName',
        'productCategory',
        'productStock',
        'productImage',
        [sequelize.fn('COUNT', sequelize.col('productId')), 'quantity'],
        [sequelize.fn('SUM', sequelize.col('productPrice')), 'productPrice']
      ],
      group: [
        'productId',
        'productName',
        'productCategory',
        'productStock',
        'productImage'
      ]
    })    
      .then(items => {
        let precioTotal = 0;
        let carrito = [];
        items.forEach(item => {
          const producto = {
            "productId": item.dataValues.productId,
            'productName': item.dataValues.productName,
            'productPrice': item.dataValues.productPrice,
            'productCategory': item.dataValues.productCategory,
            'productStock': item.dataValues.productStock,
            'productImage': item.dataValues.productImage,
            "quantity": item.dataValues.quantity,
            // también puedes incluir aquí otros campos si los necesitas
          };
          carrito.push(producto);
          precioTotal += item.dataValues.quantity * item.dataValues.productPrice; // actualizar el precio total con la cantidad de productos y su precio
        });
        console.log(carrito)
        res.render("productCart.ejs", { carrito, precioTotal });
      })
      .catch(error => {
        console.error(error);
        res.status(500).send('Error al obtener el carrito');
      });

  },

  deleteItem: (req, res) => {

    db.Cart.destroy({ where: { productId: req.params.id } })
      .then(res.redirect("/cart"))

  },
};

module.exports = controller;
