const express = require("express");
const path = require("path");


const controlador = {

index: (req, res)=> {res.render("index")},

product: (req, res)=> {res.render("productDetails")},

product2: (req, res)=> {res.render("productDetailsCopy")},

productCart: (req, res)=> {res.render("productCart")},

registration: (req, res)=> {res.render("registrationForm")},

login: (req, res)=> {res.render("login")},

createProduct: (req, res)=> {res.render("createProduct")},

editProduct: (req, res)=> {res.render("editProduct")},

productsList: (req, res)=> {res.render("productsList")},

}

module.exports = controlador