const express = require("express");
const path = require("path");
const fs = require("fs");
const { Console } = require("console");

const usersFilePath = path.join(__dirname, '../data/usersDataBase.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, "utf8"));

const controller = {
    users: (req, res)=> {
        res.render("users")
    }
}


module.exports = controller