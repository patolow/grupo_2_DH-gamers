const express = require("express");
const path = require("path");
const fs = require("fs");
const { body } = require('express-validator')
const usersFilePath = path.join(__dirname, '../data/usersDataBase.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, "utf8"));

const loginValidationsMiddleware = [
  body('email').notEmpty().withMessage('Debes escribir tu correo electrónico').bail()
  .isEmail().withMessage('Debes escribir un formato de correo electrónico válido'),
  body('password').notEmpty().withMessage('Debes escribir una contraseña').bail()
]


module.exports = loginValidationsMiddleware