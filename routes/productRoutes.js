const express = require("express");
const router = express.Router();
const productControllers = require("../controllers/productControllers")
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, '../public/images/products')),

  filename: (req, file, cb) => cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)),
});

const upload = multer({ storage })


router.get("/detail/:id/", productControllers.getProductDetail);

router.get("/edit/:id/", productControllers.getEditProduct);
router.put("/edit/:id/", upload.any(), productControllers.editProduct); 


router.get("/create/", productControllers.getCreateProduct);
router.post("/create/", upload.any(), productControllers.createProduct); 

router.get("/list/", productControllers.getProductsList);

router.get("/all/placasdevideo/", productControllers.placasdevideo);
router.get("/all/monitores/", productControllers.monitores);
router.get("/all/microprocesadores/", productControllers.microprocesadores);
router.get("/all/motherboards/", productControllers.motherboards);
router.get("/all/watercooling/", productControllers.watercooling);
router.get("/all/others/", productControllers.others);

router.get("/cart/", productControllers.productCart);

router.delete('/delete/:id/', productControllers.destroy); //done

router.get("/all/", productControllers.productsAll); //done



module.exports = router
