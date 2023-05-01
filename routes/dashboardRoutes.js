const express = require("express");
const router = express.Router();
const { productsListController, usersListController, categoryListController, productsDetailController, userDetailController } = require("../controllers/dashboardController")

router.get("/products", productsListController)
router.get("/users", usersListController)
router.get("/category", categoryListController)
router.get("/product/:id", productsDetailController)
router.get("/users/:id", userDetailController)


module.exports = router