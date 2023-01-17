const express = require("express");
const app = express();
const mainRoutes = require("./routes/mainRoutes");
const productRoutes = require("./routes/productRoutes");

const port = 3000;
const path = require("path");

app.use(express.static("public"));
app.set("view engine", "ejs");

app.listen (port, () => console.log("server listening on port", port));

app.use("/", mainRoutes)
app.use("/product", productRoutes)
