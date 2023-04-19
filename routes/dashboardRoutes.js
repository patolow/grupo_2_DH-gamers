const express = require("express");
const router = express.Router();
const {productsListController, usersListController, productsDetailController, userDetailController} = require("../controllers/dashboardController")

router.get("/products", productsListController)
router.get("/users", usersListController)
router.get("/products/:id", productsDetailController)
router.get("/users/:id", userDetailController)


module.exports = router