const express = require("express");
const router = express.Router();
const mainControllers = require("../controllers/mainControllers")

router.get("/", mainControllers.index);

router.get("/registration", mainControllers.registration);

router.get("/login", mainControllers.login);

module.exports = router