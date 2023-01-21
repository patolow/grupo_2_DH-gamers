const express = require("express");
const path = require("path");
const fs = require("fs");

const productsFilePath = path.join(__dirname, '../data/productsDataBasecopy.json');
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
    let imagesFooter = productDetail.footerImage.split(",")
    res.render("productDetails", { productDetail, imagesSlider, imagesFooter })
  }, //done

  getCreateProduct: (req, res) => {
    res.render("createProduct")
  }, //to do

  createProduct: (req, res) => {
  }, //to do

  getEditProduct: (req, res) => {
    let idProduct = parseInt(req.params.id);
    let productToEdit = products.find(product => product.id === idProduct)

    res.render("editProduct", { productToEdit })
  }, //done

  editProduct: (req, res) => {

  }, //to do

  getProductsList: (req, res) => {
    let imagenesindex = [];
    for (let i = 0; i <= products.length - 1; i++) {
      let firstImage = products[i].sliderImage.split(",")[0]
      imagenesindex.push(firstImage);
    }
    res.render("productsList", { products, imagenesindex })
  }, //done

  //Methods for filtering products from productsList

  placasdevideo: (req, res) => {
    let placasdevideo = products.filter(product => product.category === "Placas de video")
    let imagenesindex = getImagesIndex(placasdevideo)
    res.render("productsList", { products: placasdevideo, imagenesindex })
  },

  monitores: (req, res) => {
    let monitores = products.filter(product => product.category === "Monitores")
    let imagenesindex = getImagesIndex(monitores)
    res.render("productsList", { products: monitores, imagenesindex })
  },

  microprocesadores: (req, res) => {
    let microprocesadores = products.filter(product => product.category === "Microprocesadores")
    let imagenesindex = getImagesIndex(microprocesadores)
    res.render("productsList", { products: microprocesadores, imagenesindex })
  },

  motherboards: (req, res) => {
    let motherboards = products.filter(product => product.category === "Motherboards")
    let imagenesindex = getImagesIndex(motherboards)
    res.render("productsList", { products: motherboards, imagenesindex })
  },

  watercooling: (req, res) => {
    let watercooling = products.filter(product => product.category === "Water Cooling")
    let imagenesindex = getImagesIndex(watercooling)
    res.render("productsList", { products: watercooling, imagenesindex })
  },

  others: (req, res) => {
    let others = products.filter(product => product.category === "Otros")
    let imagenesindex = getImagesIndex(others)
    res.render("productsList", { products: others, imagenesindex })
  },

  //Final filtering methods

  productCart: (req, res) => { res.render("productCart") },
  destroy: (req, res) => { },

}

module.exports = controller