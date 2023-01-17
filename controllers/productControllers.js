const express = require("express");
const path = require("path");


const controlador = {

product: (req, res)=> {res.render("productDetails")},

productCart: (req, res)=> {res.render("productCart")},

createProduct: (req, res)=> {res.render("createProduct")},

editProduct: (req, res)=> {res.render("editProduct")},

productsList: (req, res)=> {res.render("productsList")},

}

module.exports = controlador