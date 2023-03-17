const express = require("express");
const path = require("path");
const fs = require("fs");
const router = express.Router();
const userControllers = require("../controllers/userControllers")
const multer = require('multer');
const { body } = require('express-validator')
const guestMiddleware = require('../middlewares/guestMiddleware')
const authMiddleware = require('../middlewares/authMiddleware')
const registerValidationsMiddleware = require('../middlewares/registerValidationsMiddleware')
const loginValidationsMiddleware = require('../middlewares/loginValidationsMiddleware')
const usersFilePath = path.join(__dirname, '../data/usersDataBase.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, "utf8"));

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, '../public/images/users')),

  filename: (req, file, cb) => cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)),
});
const uploadFile = multer({ storage })



router.get("/users", userControllers.users)

router.get("/profile", authMiddleware, userControllers.profile)

router.get("/logout", userControllers.logout)


router.get("/register", guestMiddleware, userControllers.register);
router.post("/register", uploadFile.single('profilePhoto'), registerValidationsMiddleware, userControllers.processRegister); //registerValidationsMiddleware, 


router.get("/login", guestMiddleware, userControllers.getLogin);
router.post("/login", userControllers.login)

router.get("/edit/:id", userControllers.getEditUser);
router.put("/edit/:id", uploadFile.single('profilePhoto'), userControllers.editUser)


module.exports = router


