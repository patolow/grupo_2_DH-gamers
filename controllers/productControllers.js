const express = require("express");
const path = require("path");
const fs = require("fs");

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, "utf8"));

const controller = {

productDetail: (req, res)=> {
    let idProduct = parseInt(req.params.id); //1
    let productDetail = products.find( products => products.id === idProduct)
    let imagesSlider = productDetail.sliderImage.split(",") 
    let imagesFooter= productDetail.footerImage.split(",")
    res.render("productDetails", {productDetail, imagesSlider, imagesFooter})
},

productCart: (req, res)=> {res.render("productCart")},

createProduct: (req, res)=> {res.render("createProduct")},

editProduct: (req, res)=> {res.render("editProduct")},

productsList: (req, res)=> {res.render("productsList")},

}

module.exports = controller