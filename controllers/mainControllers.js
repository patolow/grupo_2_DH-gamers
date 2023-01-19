const express = require("express");
const path = require("path");
const fs = require('fs');
const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, "utf8"));



const controlador = {

index: (req, res)=> {res.render("index", {products})},

productCart: (req, res)=> {res.render("productCart")},

registration: (req, res)=> {res.render("registrationForm")},

login: (req, res)=> {res.render("login")},

}


module.exports = controlador