const express = require("express");
const router = express.Router();
const productControllers = require("../controllers/productControllers")

router.get("/detail/:id/", productControllers.productDetail);

//router.get("/product2", productControllers.product2);

router.get("/cart/", productControllers.productCart);

router.get("/create/", productControllers.createProduct);

router.get("/edit/:id/", productControllers.editProduct);

router.get("/list/", productControllers.productsList);

module.exports = router