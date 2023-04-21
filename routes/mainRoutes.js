const express = require("express");
const router = express.Router();
const mainControllers = require("../controllers/mainControllers")
const cartControllers = require("../controllers/cartControllers")
const cartMiddleware = require('../middlewares/cartMiddleware')



router.get("/error", mainControllers.error);

router.get("/", mainControllers.index);


router.get('/cart', cartMiddleware, cartControllers.getCart);
router.post('/cart', cartMiddleware, cartControllers.addItemtoCart);
router.post('/cart/remove', cartMiddleware, cartControllers.removerUnItem);
router.post('/cart/add', cartMiddleware, cartControllers.agregarUnItem);

router.get("/aboutUs", mainControllers.aboutUs);


router.delete('/cart/delete/:id/', cartControllers.deleteItem); //done


// FALTA AGREGAR MIDDLEWARE PARA LOGUEAR ANTES DE USAR EL CARRITO



module.exports = router