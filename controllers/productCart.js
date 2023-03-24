const express = require("express");
const db = require("../database/models")

const getImagesIndex = (category) => {
  let imagenesindex = [];
  for (let i = 0; i <= category.length - 1; i++) {
    let firstImage = category[i].sliderImage.split(",")[0]
    category[i].sliderImage = firstImage
  }
  return imagenesindex
}

const controller = {

  getProductCart: (req, res) => { res.render("productCart") },

  

}


module.exports = controller
