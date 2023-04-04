const { body } = require('express-validator')
const db = require("../database/models")
const express = require("express");
const path = require("path");
const fs = require("fs");

const createProductValidationsMiddleware = [
  body('name').notEmpty().withMessage('Debes escribir el nombre del producto').bail().isLength({ min: 3 }).withMessage('Mínimo 8 catacteres')
    .custom(async (value) => {
      try {
        let existingProduct = await db.Product.findOne({
          where: {
            'name': value
          }
        })
        if (existingProduct) {
          return Promise.reject()
        }
      } catch (error) {
        console.log(error)
      }
    })
    .withMessage('Ese producto existe.'),
  body('id_category').notEmpty().withMessage('Debes seleccionar la categoría del producto'),
  body('price').notEmpty().withMessage('Debes escribir el precio de tu producto').bail().isLength({ max: 6 }).withMessage('El precio de tu producto no es válido, prueba un valor menor'),
  body('bestSellers').notEmpty().withMessage('Debes seleccionar si tu producto es un best seller'),
  body('stock').notEmpty().withMessage('Debes seleccionar la cantidad de productos disponibles'),
  body('description').notEmpty().withMessage('La descripción del producto es obligatoria').bail().isLength({ min: 50 }).withMessage('Debes escribir los detalles de tu prodcuto'),
  body('sliderImage').custom((value, { req }) => {
    let file = req.file
    let acceptedExtension = ['.jpg', '.jepg', '.png', '.gif']

    if (file) {

      let fileExtension = path.extname(file.originalname)

      if (!acceptedExtension.includes(fileExtension)) {
        throw new Error('Las extensiones de archivo permitidas son:' + acceptedExtension.join(', '))
      }
    }
    return true
  }
  )


]


module.exports = createProductValidationsMiddleware