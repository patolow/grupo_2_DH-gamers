const express = require("express");
const path = require("path");


const controlador = {

index: (req, res)=> {res.render("index")},

productCart: (req, res)=> {res.render("productCart")},

registration: (req, res)=> {res.render("registrationForm")},

login: (req, res)=> {res.render("login")},

}

module.exports = controlador