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

    if (req.mustRedirect) {
      return res.status(401).send({
        redirectToLogin: true,
      })
    }

    const promises = [];

    for (let i = 0; i < req.body[req.body.length - 1].quantity; i++) {
      // guardar los datos del último producto en la base de datos
      promises.push(
        db.Cart.create({
          "productId": req.body[req.body.length - 1].id,
          "userId": req.session.usuarioLogueado.id
        })
      );
    }
    Promise.all(promises)
      .then(() => {
        return res.status(200).send('Producto(s) agregado(s) al carrito');
      })
      .catch((error) => {
        console.error(error);
        return res.status(500).send('Error al agregar el/los producto(s) al carrito');
      });
  },


  getCart: (req, res) => {
    //tomo la base de datos exluyendo duplicados
    db.Cart.findAll({
      attributes: [
        'productId',
        [Sequelize.fn('SUM', Sequelize.col('product.price')), 'totalPrice'],
        [Sequelize.fn('COUNT', Sequelize.col('productId')), 'quantity']
      ],
      include: [{
        model: db.Product,
        as: 'product',
        include: [{
          model: db.Category,
          as: 'category'
        }]
      }],
      where: {
        userId: req.session.usuarioLogueado.id
      },
      group: ['product.id']
    })
    .then(items => {
      let precioTotal = 0;
      let carrito = [];
      let contadorItems = 0;

      items.forEach(item => {
        const producto = {
          "productId": item.dataValues.productId,
          'productName': item.dataValues.product.name,
          'productPrice': item.dataValues.product.price,
          'productCategory': item.dataValues.product.category.name,
          'productStock': item.dataValues.product.stock,
          'productImage': item.dataValues.product.sliderImage.split(",")[0],
          "quantity": item.dataValues.quantity,
          // también puedes incluir aquí otros campos si los necesitas
        };
        carrito.push(producto);
        contadorItems += item.dataValues.quantity; // update the counter with the quantity of each product
        precioTotal += item.dataValues.quantity * item.dataValues.product.price; // actualizar el precio total con la cantidad de productos y su precio
      });
      // console.log(carrito)
      res.render("productCart.ejs", { carrito, precioTotal, contadorItems });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error al obtener el carrito');
    });
  },

  deleteItem: (req, res) => {
    db.Cart.destroy({ where: { productId: req.params.id } })
      .then(res.redirect("/cart"))
  },



  removerUnItem: (req, res) => {
    // console.log(req.body.productId)
    // console.log(req.session.usuarioLogueado.id)
    db.Cart.destroy({
      where: {
        productId: req.body.productId,
        userId: req.session.usuarioLogueado.id
      },
      limit: 1
    })
      .then(() => {
        res.redirect('/cart');
      })
      .catch(err => {
        console.error(err);
        // Manejo del error
      });

    //REVISAR ESTO!
  },

  agregarUnItem: (req, res) => {

    db.Cart.create({
      "productId": req.body.productId,
      "userId": req.session.usuarioLogueado.id
    })
      .then(() => {
        return res.redirect('./cart');
      })
      .catch(err => {
        console.error(err);
        // Manejo del error
      });

    //REVISAR ESTO!
  }

};

module.exports = controller;
