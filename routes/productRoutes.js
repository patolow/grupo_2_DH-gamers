const express = require("express");
const router = express.Router();
const productControllers = require("../controllers/productControllers")
const cartMiddleware = require('../middlewares/cartMiddleware')
const createProductValidationsMiddleware = require('../middlewares/createProductValidationsMiddleware')
const path = require("path");
const fs = require("fs");
const { Op } = require('sequelize');


const multer = require('multer');
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, '../public/images/products')),

  filename: (req, file, cb) => cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)),
});

const upload = multer({ storage })


router.get("/detail/:id/", productControllers.getProductDetail); //done

router.get("/edit/:id/", productControllers.getEditProduct); //done
router.put("/edit/:id/",  upload.any(), productControllers.editProduct); //to do


router.get("/create/", productControllers.getCreateProduct); //done
router.post("/create/", upload.any(), createProductValidationsMiddleware, productControllers.createProduct); //to do

router.get("/list/", productControllers.getProductsList); //done

router.get("/sales/", productControllers.productSales); //done

router.get("/all/placasdevideo/", productControllers.placasdevideo);
router.get("/all/monitores/", productControllers.monitores);
router.get("/all/microprocesadores/", productControllers.microprocesadores);
router.get("/all/motherboards/", productControllers.motherboards);
router.get("/all/watercooling/", productControllers.watercooling);
router.get("/all/joystick/", productControllers.joystick);
router.get("/all/others/", productControllers.others);

router.delete('/delete/:id/', productControllers.destroy); //done

router.get("/all/", productControllers.productsAll); //done



module.exports = router
