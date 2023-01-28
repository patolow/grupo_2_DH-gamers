const express = require("express");
const router = express.Router();
const userControllers = require("../controllers/userControllers")
const multer = require('multer');
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, '../../public/images/users')),

  filename: (req, file, cb) => cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)),
});

const upload = multer({ storage })

router.get("/users", userControllers.users)

router.get("/register", userControllers.register);

router.get("/login", userControllers.login);

module.exports = router


