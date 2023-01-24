const express = require("express");
const app = express();
const mainRoutes = require("./routes/mainRoutes");
const productRoutes = require("./routes/productRoutes");
const methodOverride = require('method-override');

const port = 3000;
const path = require("path");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());  // Necesario para enviar data formulario con POST
app.use(methodOverride('_method')); // Pasar poder pisar el method="POST" en el formulario por PUT y DELETE
app.set("view engine", "ejs");


app.listen(port, () => console.log("server listening on port", port));

app.use("/", mainRoutes)
app.use("/product", productRoutes)


module.exports = app;