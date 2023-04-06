const express = require("express");
const router = express.Router();
const mainControllers = require("../controllers/mainControllers")
const cartControllers = require("../controllers/cartControllers")
const authMiddleware = require('../middlewares/authMiddleware')




router.get("/", mainControllers.index);


router.get('/cart', cartControllers.getCart);
router.post('/cart',authMiddleware, cartControllers.addItemtoCart);

router.delete('/cart/delete/:id/', cartControllers.deleteItem); //done


// FALTA AGREGAR MIDDLEWARE PARA LOGUEAR ANTES DE USAR EL CARRITO



module.exports = router