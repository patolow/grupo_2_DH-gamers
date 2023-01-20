const express = require("express");
const path = require("path");
const fs = require("fs");

const productsFilePath = path.join(__dirname, '../data/productsDataBasecopy.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, "utf8"));

const controller = {

getProductDetail: (req, res)=> {
    let idProduct = parseInt(req.params.id); 
    let productDetail = products.find( product => product.id === idProduct)
    let imagesSlider = productDetail.sliderImage.split(",") 
    let imagesFooter= productDetail.footerImage.split(",")
    res.render("productDetails", {productDetail, imagesSlider, imagesFooter})
}, //done

getCreateProduct: (req, res)=> {
    res.render("createProduct")
}, //to do

createProduct: (req, res)=> {
}, //to do

getEditProduct: (req, res)=> {
    let idProduct = parseInt(req.params.id); 
    let productToEdit = products.find( product => product.id === idProduct)
    res.render("editProduct", {productToEdit})
}, //done

editProduct: (req, res)=> {

}, //to do

getProductsList: (req, res)=> {
    let imagenesindex = [];
    for (let i=0; i<= products.length-1; i++) {
        let firstImage = products[i].sliderImage.split(",")[0]
        imagenesindex.push(firstImage);
    }
    res.render("productsList", {products, imagenesindex} )
}, //done


productCart: (req, res)=> {res.render("productCart")},
destroy : (req, res) => {}

}

module.exports = controller