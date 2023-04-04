const express = require("express");
const db = require("../database/models")
const { validationResult } = require('express-validator')
const path = require("path");


const getImagesIndex = (category) => {
  let imagenesindex = [];
  for (let i = 0; i <= category.length - 1; i++) {
    let firstImage = category[i].sliderImage.split(",")[0]
    category[i].sliderImage = firstImage
  }
  return imagenesindex
}

const controller = {

  getProductDetail: (req, res) => {
    db.Product.findByPk(req.params.id)
      .then((product) => {
        let imagesSlider = product.sliderImage.split(",")
        let firstImage = product.sliderImage.split(",")[0]
        res.render("productDetails", { productDetail: product, imagesSlider, firstImage })
      })
      .catch(err => console.error(err));
  },

  getCreateProduct: (req, res) => {
    res.render("createProduct")
  },

  createProduct: (req, res) => {
    //  const defaultImage = '??????DEFAULT IMAGE';
    // const sliderImage = req.body.sliderImage ? req.body.sliderImage : "defaultImage";

    let errors = validationResult(req);
    if (errors.isEmpty()) {

      // const sliderImage = req.file ? '/images/products/' + req.file.filename : '/images/users/profile-photo-default.jpg'

      let sliderImage = ''

      if (req.files) {
        for (let i = 0; i < req.files.length; i++) {
          let nombreImagen = '/images/products/' + req.files[i].filename + ',';
          sliderImage += nombreImagen;
        }
      } else {
        sliderImage = '/images/users/profile-photo-default.jpg'
      } 

      db.Product.create({
        "name": req.body.name,
        "price": req.body.price,
        "discount": req.body.discount,
        "bestSellers": req.body.bestSellers,
        "stock": req.body.stock,
        "reviews": req.body.reviews,
        "deliveryDate": req.body.deliveryDate,
        "description": req.body.description,
        "sliderImage": sliderImage,
        "id_category": req.body.id_category,

      })
        .then(product => {
          const productUrl = `/product/detail/${product.id}`;
          res.redirect(productUrl);
        })
        .catch(error => {
          console.error("Error al crear el producto: ", error);
          res.status(500).send('Error al crear el producto.');
        });
    } else {
      res.render('createProduct', { errors: errors.mapped(), oldData: req.body, oldFile: req.file });
    }

  },

  //done

  getEditProduct: (req, res) => {
    db.Product.findByPk(req.params.id)
      .then((product) => {
        let imagesSlider = product.sliderImage.split(",")
        res.render("editProduct", { productToEdit: product, imagesSlider })
      })
  }, //done

  editProduct: (req, res) => {
    db.Product.update({
      "name": req.body.name,
      "price": req.body.price,
      "discount": req.body.discount,
      "bestSellers": req.body.bestSellers == "si" ? "true" : "false",
      "stock": req.body.stock,
      "reviews": req.body.reviews,
      "deliveryDate": req.body.deliveryDate,
      "description": req.body.description,
      "sliderImage": req.body.sliderImage ? req.body.sliderImage : db.Product.sliderImage,
      "id_category": req.body.id_category,
    },
      {
        where: { id: req.params.id }
      }
    )
      .then(product => {
        const productUrl = `/product/detail/${req.params.id}`; //te manda a producto que editaste 
        res.redirect(productUrl);
      })
      .catch(error => {
        console.error("Error al editar el producto: ", error);
        res.status(500).send('Error al editar el producto.');
      });
  }, //done

  getProductsList: (req, res) => {
    let imagenesindex = [];
    db.Product.findAll({
      include: [{ association: "category" }]
    })
      .then(products => {
        for (let i = 0; i <= products.length - 1; i++) {
          let firstImage = products[i].sliderImage.split(",")[0]
          products[i].sliderImage = firstImage
        }
        res.render("productsList", { products })
      })
      .catch(err => console.error(err));
  },

  //done

  // //Methods for filtering products from productsList

  placasdevideo: (req, res) => {
    db.Product.findAll({
      where: { id_category: "1" }
    })
      .then(placasdevideo => {
        let imagenesindex = getImagesIndex(placasdevideo)
        res.render("productsAll", { products: placasdevideo, imagenesindex })
      })
      .catch(err => {
        console.error("Error al buscar productos con categoría 'GPU': ", err);
        res.status(500).send('Error al buscar productos con categoría "GPU".');
      });
  },

  monitores: (req, res) => {
    db.Product.findAll({
      where: { id_category: "2" }
    })
      .then(monitores => {
        let imagenesindex = getImagesIndex(monitores)
        res.render("productsAll", { products: monitores, imagenesindex })
      })
      .catch(err => {
        console.error("Error al buscar productos con categoría 'Monitores': ", err);
        res.status(500).send('Error al buscar productos con categoría "Monitores".');
      });
  },

  microprocesadores: (req, res) => {
    db.Product.findAll({
      where: { id_category: "3" }
    })
      .then(microprocesadores => {
        let imagenesindex = getImagesIndex(microprocesadores)
        res.render("productsAll", { products: microprocesadores, imagenesindex })
      })
      .catch(err => {
        console.error("Error al buscar productos con categoría 'Microprocesadores': ", err);
        res.status(500).send('Error al buscar productos con categoría "Microprocesadores".');
      });
  },

  motherboards: (req, res) => {
    db.Product.findAll({
      where: { id_category: "4" }
    })
      .then(motherboards => {
        let imagenesindex = getImagesIndex(motherboards)
        res.render("productsAll", { products: motherboards, imagenesindex })
      })
      .catch(err => {
        console.error("Error al buscar productos con categoría 'Motherboards': ", err);
        res.status(500).send('Error al buscar productos con categoría "Motherboards".');
      });
  },

  watercooling: (req, res) => {
    db.Product.findAll({
      where: { id_category: "5" }
    })
      .then(watercooling => {
        let imagenesindex = getImagesIndex(watercooling)
        res.render("productsAll", { products: watercooling, imagenesindex })
      })
      .catch(err => {
        console.error("Error al buscar productos con categoría 'Water Cooling': ", err);
        res.status(500).send('Error al buscar productos con categoría "Water Cooling".');
      });
  },

  joystick: (req, res) => {
    db.Product.findAll({
      where: { id_category: "6" }
    })
      .then(joystick => {
        let imagenesindex = getImagesIndex(joystick)
        res.render("productsAll", { products: joystick, imagenesindex })
      })
      .catch(err => {
        console.error("Error al buscar productos con categoría 'Joysticks': ", err);
        res.status(500).send('Error al buscar productos con categoría "Joysticks".');
      });
  },

  others: (req, res) => {
    db.Product.findAll({
      where: { id_category: "7" }
    })
      .then(otros => {
        let imagenesindex = getImagesIndex(otros)
        res.render("productsAll", { products: otros, imagenesindex })
      })
      .catch(err => {
        console.error("Error al buscar productos con categoría 'Otros': ", err);
        res.status(500).send('Error al buscar productos con categoría "Otros".');
      });
  },

  destroy: (req, res) => {
    db.Product.destroy({ where: { id: req.params.id } })
      .then(res.redirect("/product/list/"))
  },

  productsAll: (req, res) => {
    db.Product.findAll()
      .then(products => {
        for (let i = 0; i <= products.length - 1; i++) {
          let firstImage = products[i].sliderImage.split(",")[0]
          products[i].sliderImage = firstImage
        }
        // res.json(products);
        res.render('productsAll.ejs', { products })
      })
      .catch(err => console.error(err));
  },


}


module.exports = controller
