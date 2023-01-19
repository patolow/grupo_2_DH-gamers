const express = require("express");
const path = require("path");
const fs = require('fs');
const productsFilePath = path.join(__dirname, '../data/productsDataBasecopy.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, "utf8"));



const controlador = {

index: (req, res)=> {
    let imagenesindex = [];
    for (let i=0; i<= products.length-1; i++) {
        let firstImage = products[i].sliderImage.split(",")[0]
        imagenesindex.push(firstImage);
    }

    console.log(imagenesindex)
    res.render("index", {products, imagenesindex })
},

productCart: (req, res)=> {res.render("productCart")},

registration: (req, res)=> {res.render("registrationForm")},

login: (req, res)=> {res.render("login")},

}


module.exports = controlador