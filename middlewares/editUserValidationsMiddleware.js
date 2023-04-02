const express = require("express");
const path = require("path");
const fs = require("fs");
const { body } = require('express-validator')
const usersFilePath = path.join(__dirname, '../data/usersDataBase.json');
const db = require("../database/models")


const editUserValidationsMiddleware = [
  body('completeName').notEmpty().withMessage('Debes escribir un nombre'),
  body('userName').notEmpty().withMessage('Debes escribir un nombre de usuario'),
  body('birthday').notEmpty().withMessage('Debes seleccionar tu fecha de nacimiento'),
  body('email')
    .notEmpty().withMessage('Debes escribir tu correo electrónico').bail()
    .isEmail().withMessage('Debes escribir un formato de correo electrónico válido')
    .custom(async (value, { req })=> {
      try {
        let registeredUser = await db.User.findOne({
          where: {
            'email': value
          }
        })
        if (registeredUser && value !== req.body.email) {
          return Promise.reject()
        }
      } catch (error) {
        console.log(error)
      }
    })
    .withMessage('Ese nombre de usuario ya existe.'),
  body('profilePhoto').custom((value, { req }) => {
    let file = req.file
    let acceptedExtension = ['.jpg', '.png', '.gif']

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

module.exports = editUserValidationsMiddleware
