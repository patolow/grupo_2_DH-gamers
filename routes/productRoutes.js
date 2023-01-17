const express = require("express");
const router = express.Router();
const productControllers = require("../controllers/productControllers")

router.get("/detalle", productControllers.product);

//router.get("/product2", productControllers.product2);

router.get("/productCart", productControllers.productCart);

router.get("/createProduct", productControllers.createProduct);

router.get("/editProduct", productControllers.editProduct);

router.get("/productsList", productControllers.productsList);

module.exports = router