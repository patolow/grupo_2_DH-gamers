const express = require("express");
const path = require("path");
const fs = require("fs");
const router = express.Router();
const userControllers = require("../controllers/userControllers")
const multer = require('multer');
const { body } = require('express-validator')
const guestMiddleware = require('../middlewares/guestMiddleware')
const authMiddleware = require('../middlewares/authMiddleware')

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, '../public/images/users')),

  filename: (req, file, cb) => cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)),
});
const uploadFile = multer({ storage })


const registerValidations = [
  body('fullName').notEmpty().withMessage('Debes escribir un nombre'),
  body('userName').notEmpty().withMessage('Debes escribir un nombre de usuario'),
  body('birthday').notEmpty().withMessage('Debes seleccionar tu fecha de nacimiento'),
  body('email')
    .notEmpty().withMessage('Debes escribir tu correo electrónico').bail()
    .isEmail().withMessage('Debes escribir un formato de correo electrónico válido'),
  body('password').notEmpty().withMessage('Debes escribir una contraseña'),
  body('confirmPassword').notEmpty().withMessage('Debes repetir tu contraseña'),
  body('termsAndConditions').custom((value, {req}) => {
    let terms = req.body.termsAndConditions
    if( !terms) {
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

const loginValidations = [
  body('email').notEmpty().withMessage('Debes escribir tu correo electrónico').bail()
  .isEmail().withMessage('Debes escribir un formato de correo electrónico válido'),
  body('password').notEmpty().withMessage('Debes escribir una contraseña').isLength({min: 8}).withMessage('Minimo 8 catacteres'),
]


router.get("/users", userControllers.users)

router.get("/profile", authMiddleware, userControllers.profile)

router.get("/logout", userControllers.logout)


router.get("/register", guestMiddleware, userControllers.register);
router.post("/register", uploadFile.single('profilePhoto'), registerValidations, userControllers.processRegister);


router.get("/login", guestMiddleware, userControllers.getLogin);
router.post("/login", loginValidations,  userControllers.login)


module.exports = router


