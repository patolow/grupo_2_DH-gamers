const express = require("express");
const app = express();
const mainRoutes = require("./routes/mainRoutes");
const productRoutes = require("./routes/productRoutes");
const methodOverride =  require('method-override');

const port = 3000;
const path = require("path");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride('_method'));
app.set("view engine", "ejs");


app.listen (port, () => console.log("server listening on port", port));

app.use("/", mainRoutes)
app.use("/product", productRoutes)


module.exports = app;