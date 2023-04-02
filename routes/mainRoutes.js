const express = require("express");
const router = express.Router();
const mainControllers = require("../controllers/mainControllers")
const cartControllers = require("../controllers/cartControllers")




router.get("/", mainControllers.index);


router.get('/cart', cartControllers.getProductCart);
router.post('/cart', cartControllers.addItem);








module.exports = router