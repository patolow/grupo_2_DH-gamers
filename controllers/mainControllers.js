const express = require("express");
const path = require("path");
const fs = require('fs');
const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, "utf8"));



const controlador = {

index: (req, res)=> {
    let bestSeller = products.filter(product => product.bestSellers == true)
    let imagenesindex = [];
    for (let i=0; i<= bestSeller.length-1; i++) {
        let firstImage = bestSeller[i].sliderImage.split(",")[0]
        bestSeller[i].sliderImage = firstImage
    }
    res.render("index", {bestSeller})
},

registration: (req, res)=> {res.render("registrationForm")},

login: (req, res)=> {res.render("login")},

}


module.exports = controlador