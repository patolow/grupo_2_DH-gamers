const express = require("express");
const router = express.Router();
const mainControllers = require("../controllers/mainControllers")

router.get("/", mainControllers.index);

router.get("/product", mainControllers.product);

router.get("/product2", mainControllers.product2);

router.get("/productCart", mainControllers.productCart);

router.get("/registration", mainControllers.registration);

router.get("/login", mainControllers.login);


module.exports = router