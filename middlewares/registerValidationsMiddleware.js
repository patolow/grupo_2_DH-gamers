const express = require("express");
const path = require("path");
const fs = require("fs");
const { body } = require('express-validator')
const usersFilePath = path.join(__dirname, '../data/usersDataBase.json');
const db = require("../database/models")


const registerValidationsMiddleware = [
  body('fullName').notEmpty().withMessage('Debes escribir un nombre'),
  body('userName').notEmpty().withMessage('Debes escribir un nombre de usuario'),
  body('birthday').notEmpty().withMessage('Debes seleccionar tu fecha de nacimiento'),
  body('email')
    .notEmpty().withMessage('Debes escribir tu correo electrónico').bail()
    .isEmail().withMessage('Debes escribir un formato de correo electrónico válido')
    .custom((value, { req }) => {
      return db.User.findByEmail(value)
        .then(user => {
          if (user) {
            return Promise.reject('Ese mail ya está en uso');
          }
        })
      return true

    }),
  body('password').notEmpty().withMessage('Debes escribir una contraseña de al menos 8 caracteres').isLength({ min: 8 }).withMessage('Debes escribir una contraseña de al menos 8 caracteres'),
  body('confirmPassword').notEmpty().withMessage('Debes repetir tu contraseña').isLength({ min: 8 }).withMessage('Debes repetir tu contraseña'),
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
