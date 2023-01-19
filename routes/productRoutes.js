const express = require("express");
const router = express.Router();
const productControllers = require("../controllers/productControllers")
const multer = require('multer');
const storage = multer.diskStorage( {
    destination: (req, file, cb) => cb(null, path.join(__dirname, '../../public/images/products')),

    filename: (req, file, cb) => cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)),
});

const upload = multer({storage})



router.get("/detail/:id/", productControllers.productDetail);

//router.get("/product2", productControllers.product2);

router.get("/cart/", productControllers.productCart);

router.get("/create/", productControllers.createProduct);

router.get("/edit/:id/", productControllers.editProduct);

router.delete('/delete/:id/', productControllers.destroy);

router.get("/list/", productControllers.productsList);

module.exports = router