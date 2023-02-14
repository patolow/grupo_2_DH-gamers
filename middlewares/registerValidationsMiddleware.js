const express = require("express");
const path = require("path");
const fs = require("fs");
const { body } = require('express-validator')
const usersFilePath = path.join(__dirname, '../data/usersDataBase.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, "utf8"));

const registerValidationsMiddleware = [
  body('fullName').notEmpty().withMessage('Debes escribir un nombre'),
  body('userName').notEmpty().withMessage('Debes escribir un nombre de usuario'),
  body('birthday').notEmpty().withMessage('Debes seleccionar tu fecha de nacimiento'),
  body('email').custom((value, { req }) => {
    for (let i = 0; i < users.length; i++) {
      let mailAChequear = req.body.email;
      if (mailAChequear === users[i].email) {
        throw new Error('Ese mail ya está en uso');
      }
    } return true
  })
    .notEmpty().withMessage('Debes escribir tu correo electrónico').bail()
    .isEmail().withMessage('Debes escribir un formato de correo electrónico válido'),

  body('password').notEmpty().isLength({ min: 8 }).withMessage('Debes escribir una contraseña de al menos 8 caracteres'),
  body('confirmPassword').notEmpty().isLength({ min: 8 }).withMessage('Debes repetir tu contraseña'),
  body('termsAndConditions').custom((value, { req }) => {
    let terms = req.body.termsAndConditions
    if (!terms) {
      throw new Error('Debes aceptar los términos y condiciones')
    }
    return true
  }),
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

module.exports = registerValidationsMiddleware