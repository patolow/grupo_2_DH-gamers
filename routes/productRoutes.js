const express = require("express");
const router = express.Router();
const productControllers = require("../controllers/productControllers")
const multer = require('multer');
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, '../../public/images/products')),

  filename: (req, file, cb) => cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)),
});

const upload = multer({ storage })


router.get("/detail/:id/", productControllers.getProductDetail); //done

router.get("/edit/:id/", productControllers.getEditProduct); //done
router.put("/edit/:id/", productControllers.editProduct); //to do


router.get("/create/", productControllers.getCreateProduct); //done
router.post("/create/", productControllers.createProduct); //to do

router.get("/list/", productControllers.getProductsList); //done

router.get("/list/placasdevideo/", productControllers.placasdevideo);
router.get("/list/monitores/", productControllers.monitores);
router.get("/list/microprocesadores/", productControllers.microprocesadores);
router.get("/list/motherboards/", productControllers.motherboards);
router.get("/list/watercooling/", productControllers.watercooling);
router.get("/list/others/", productControllers.others);

router.get("/cart/", productControllers.productCart);

router.delete('/delete/:id/', productControllers.destroy); //done

router.get("/all/", productControllers.productsAll); //done



module.exports = router