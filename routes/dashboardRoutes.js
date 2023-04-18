const express = require("express");
const router = express.Router();
const {productsListController} = require("../controllers/dashboardController")

router.get("/products", productsListController)

module.exports = router