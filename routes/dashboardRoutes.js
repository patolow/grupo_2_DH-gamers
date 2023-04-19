const express = require("express");
const router = express.Router();
const {productsListController, usersListController} = require("../controllers/dashboardController")

router.get("/products", productsListController)
router.get("/users", usersListController)


module.exports = router