const express = require("express");
const path = require("path");
const fs = require("fs");
const { Console } = require("console");

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, "utf8"));

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
    let idProduct = parseInt(req.params.id);
    let productDetail = products.find(product => product.id === idProduct)
    let imagesSlider = productDetail.sliderImage.split(",")
    
    res.render("productDetails", { productDetail, imagesSlider })
  }, //done


  getCreateProduct: (req, res) => {
    res.render("createProduct")
  }, 

  createProduct: (req, res) => {
    console.log(req.body)
		let newProduct = {id: products[products.length -1].id + 1,...req.body, image: img}
    products.push(newProduct)
		fs.writeFileSync(productsFilePath, JSON.stringify(products, null, ' '));
		res.redirect('/products');
  }, //to do



  getEditProduct: (req, res) => {
    let idProduct = parseInt(req.params.id);
    let productToEdit = products.find(product => product.id === idProduct)

    res.render("editProduct", { productToEdit })
  }, //done

  editProduct: (req, res) => {
    console.log(req.body)
    let idProduct = parseInt(req.params.id);
    let productToEdit = products.find(product => product.id === idProduct);	//producto a editar en la base
    productToEdit = {id: idProduct, ...req.body};
		let newList = products.map(product => {
			if(product.id == productToEdit.id) {
				return product = {...productToEdit}
			}
			return product
		}) 
		fs.writeFileSync(productsFilePath, JSON.stringify(newList));
		res.redirect('/products/detail/' + productToEdit.id) 
  }, //done

  getProductsList: (req, res) => {
    let imagenesindex = [];
    for (let i=0; i<= products.length-1; i++) {
    let firstImage = products[i].sliderImage.split(",")[0]
    products[i].sliderImage = firstImage
}
    res.render("productsList", { products })
  }, //done

  //Methods for filtering products from productsList

  placasdevideo: (req, res) => {
    let placasdevideo = products.filter(product => product.category === "Placas de video")
    let imagenesindex = getImagesIndex(placasdevideo)
    res.render("productsAll", { products: placasdevideo, imagenesindex })
  },

  monitores: (req, res) => {
    let monitores = products.filter(product => product.category === "Monitores")
    let imagenesindex = getImagesIndex(monitores)
    res.render("productsAll", { products: monitores, imagenesindex })
  },

  microprocesadores: (req, res) => {
    let microprocesadores = products.filter(product => product.category === "Microprocesadores")
    let imagenesindex = getImagesIndex(microprocesadores)
    res.render("productsAll", { products: microprocesadores, imagenesindex })
  },

  motherboards: (req, res) => {
    let motherboards = products.filter(product => product.category === "Motherboards")
    let imagenesindex = getImagesIndex(motherboards)
    res.render("productsAll", { products: motherboards, imagenesindex })
  },

  watercooling: (req, res) => {
    let watercooling = products.filter(product => product.category === "Water Cooling")
    let imagenesindex = getImagesIndex(watercooling)
    res.render("productsAll", { products: watercooling, imagenesindex })
  },

  others: (req, res) => {
    let others = products.filter(product => product.category === "Otros")
    let imagenesindex = getImagesIndex(others)
    res.render("productsAll", { products: others, imagenesindex })
  },

destroy : (req, res) => {
  let idProduct = parseInt(req.params.id);
  let newProducts = products.filter(product => product.id !== idProduct); 
  fs.writeFileSync(productsFilePath, JSON.stringify(newProducts,null, ''));
  res.redirect("/product/list/")
},

productsAll: (req, res) =>{
let imagenesindex = [];
      for (let i=0; i<= products.length-1; i++) {
      let firstImage = products[i].sliderImage.split(",")[0]
      products[i].sliderImage = firstImage
  }
  res.render("productsAll",{products})
},

  //Final filtering methods

  productCart: (req, res)=> {res.render("productCart")},

}


module.exports = controller
