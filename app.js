const express = require("express");
const app = express();

const port = 3000;
const path = require("path");

app.use(express.static("public"));

app.listen (port, () => console.log("server listening on port", port));

app.get("/", (req, res) => res.sendFile(path.join(__dirname, "/views/index.html")));

app.get("/product", (req, res) => res.sendFile(path.join(__dirname, '/views/productDetails.html')));


app.get("/productCart", (req, res) => res.sendFile(path.join(__dirname, '/views/productCart.html')));

app.get("/registration", (req, res) => res.sendFile(path.join(__dirname, '/views/registrationForm.html')));
