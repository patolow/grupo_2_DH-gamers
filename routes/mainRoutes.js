const express = require("express");
const router = express.Router();
const mainControllers = require("../controllers/mainControllers")
const cartControllers = require("../controllers/cartControllers")
// const cartMiddleware = require('../middlewares/cartMiddleware')




router.get("/", mainControllers.index);


router.get('/cart', cartControllers.getProductCart);
router.post('/cart', cartControllers.addItem);

// FALTA AGREGAR MIDDLEWARE PARA LOGUEAR ANTES DE USAR EL CARRITO



module.exports = router