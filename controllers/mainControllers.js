const express = require("express");
const path = require("path");
const fs = require('fs');
const db = require("../database/models");

const controlador = {

index: (req, res)=> {

    db.Product.findAll({ 
        where: {bestSellers: 'true'},
    })

    .then(bestSeller => {
        let imagenesindex = [];
        for (let i=0; i<= bestSeller.length-1; i++) {
        let firstImage = bestSeller[i].sliderImage.split(",")[0]
        bestSeller[i].sliderImage = firstImage
        }
    // console.log(bestSeller)
    res.render("index", {bestSeller})
    })

    .catch(err => console.error(err))

    }

}



module.exports = controlador