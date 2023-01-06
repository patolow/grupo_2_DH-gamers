const express = require("express");
const app = express();
const mainRoutes = require("./routes/mainRoutes");

const port = 3000;
const path = require("path");

app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "./views")

app.listen (port, () => console.log("server listening on port", port));

app.use("/", mainRoutes)
