const express = require("express");
const app = express();
const mainRoutes = require("./routes/mainRoutes");
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const methodOverride = require('method-override');
const session = require("express-session");
const cookies = require("cookie-parser")

const userLoggedMiddleware = require("./middlewares/userLoggedMiddleware"); //middleware global


const port = 3000;
const path = require("path");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());  // Necesario para enviar data formulario con POST
app.use(methodOverride('_method')); // Pasar poder pisar el method="POST" en el formulario por PUT y DELETE
app.set("view engine", "ejs");
app.use(session({
    secret: "SegretoDH_Gamers",
    resave: true,
    saveUninitialized: true
}));; //Para usar la propiedad secret, "express-session"
app.use(cookies())
app.use(userLoggedMiddleware) //va siempre luego de la session

app.listen(port, () => console.log("server listening on port", port));

app.use("/", mainRoutes)
app.use("/product", productRoutes)
app.use("/users", userRoutes)


module.exports = app;