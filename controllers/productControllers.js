const express = require("express");
const db = require("../database/models")

const getImagesIndex = (category) => {
  let imagenesindex = [];
  for (let i = 0; i <= category.length - 1; i++) {
    let firstImage = category[i].sliderImage.split(",")[0]
    imagenesindex.push(firstImage);
  }
  return imagenesindex
}

const controller = {

  getProductDetail: (req, res) => {
    db.Product.findByPk(req.params.id)
      .then((product) => {
        let imagesSlider = product.sliderImage.split(",")
        res.render("productDetails", { productDetail: product, imagesSlider })
      })
      .catch(err => console.error(err));
  },

  getCreateProduct: (req, res) => {
    res.render("createProduct")
  },

  createProduct: (req, res) => {
    const defaultImage = '??????DEFAULT IMAGE';
    const sliderImage = req.body.sliderImage ? req.body.sliderImage : defaultImage;
    db.Product.create({
      "name": req.body.name,
      "price": req.body.price,
      "discount": req.body.discount,
      "category": req.body.category,
      "bestSellers": req.body.bestSellers,
      "stock": req.body.stock,
      "description": req.body.description,
      "sliderImage": sliderImage,
    })
      .then(product => {
        const productUrl = `/product/detail/${product.id}`;
        res.redirect(productUrl);
      })
      .catch(error => {
        console.error("Error al crear el producto: ", error);
        res.status(500).send('Error al crear el producto.');
      });
  },

  //to do

  getEditProduct: (req, res) => {
    db.Product.findByPk(req.params.id)
      .then((product) => {
        let imagesSlider = product.sliderImage.split(",")
        res.render("editProduct", { productToEdit: product, imagesSlider })
      })
  }, //done

  editProduct: (req, res) => {
    const defaultImage = '??????DEFAULT IMAGE';
    const sliderImage = req.body.sliderImage ? req.body.sliderImage : defaultImage;
    db.Product.update({
      "name": req.body.name,
      "price": req.body.price,
      "discount": req.body.discount,
      "category": req.body.category,
      "bestSellers": req.body.bestSellers,
      "stock": req.body.stock,
      "description": req.body.description,
      "sliderImage": sliderImage,
    },
      {
        where: { id: req.params.id }
      }
    )
    .then(product => {
      const productUrl = `/product/detail/${req.params.id}`;
      res.redirect(productUrl);
    })
    .catch(error => {
      console.error("Error al editar el producto: ", error);
      res.status(500).send('Error al editar el producto.');
    });
  }, //done

  getProductsList: (req, res) => {
    let imagenesindex = [];
    db.Product.findAll()
      .then(products => {
        for (let i = 0; i <= products.length - 1; i++) {
          let firstImage = products[i].sliderImage.split(",")[0]
          products[i].sliderImage = firstImage
        }
        res.render("productsList", { products })
      }).catch(err => console.error(err));
  }, //done

  // //Methods for filtering products from productsList

  placasdevideo: (req, res) => {
    db.Product.findOne({
      where: { category: "GPU" }
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
    db.Product.findOne({
      where: { category: "Monitores" }
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
    db.Product.findOne({
      where: { category: "Microprocesadores" }
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
    db.Product.findOne({
      where: { category: "Motherboards" }
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
    db.Product.findOne({
      where: { category: "Water Cooling" }
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

  others: (req, res) => {
    db.Product.findOne({
      where: { category: "Otros" }
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
  }

}


module.exports = controller
