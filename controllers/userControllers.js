const express = require("express");
const path = require("path");
const fs = require("fs");
const { validationResult } = require('express-validator')
const { Console } = require("console");

const usersFilePath = path.join(__dirname, '../data/usersDataBase.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, "utf8"));

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, "utf8"));

const controller = {
  users: (req, res) => {
    res.render("users")
  },

  register: (req, res) => { res.render("registrationForm") },

  processRegister: (req, res) => {

    const resultValidation = validationResult(req)
    //VALIDATION
    if (resultValidation.errors.length > 0) {
      res.render("registrationForm", { errors: resultValidation.mapped(), oldData: req.body, oldFile: req.file })
    } else {
      //Check if a file was choosen
      let profilePhoto = ''
      if (req.file) {
        profilePhoto = req.file.originalname
      } else {
        profilePhoto = './images/users/profile-photo-default.jpg'
      }
      //ADD NEW USER
      let newUser = { id: users[users.length - 1].id + 1, ...req.body, image: profilePhoto }
      users.push(newUser)
      fs.writeFileSync(usersFilePath, JSON.stringify(users, null, ' '));
      res.redirect('/');
    }
  },

  getLogin: (req, res) => { res.render("login") },

  login: (req, res) => {

    let errors = validationResult(req);

    if (errors.isEmpty()) {
        let usuarioALoguearse

        for (let i = 0; i < users.length; i++) {
          if (users[i].email == req.body.email) {
            if (users[i].password == req.body.password) { //aca iria bcrypt
              usuarioALoguearse = users[i];
              break
            }
          }
        }

        if (!usuarioALoguearse) {
          res.render('login', { errors: [ {msg : 'Credenciales inválidas. Por favor, vuelve a intentarlo.'} ], old: req.body} );
        }
        
        req.session.usuarioLogueado = usuarioALoguearse;
        res.render("profile", {usuario: req.session.usuarioLogueado})

    }

    else {
      res.render('login', { errors: errors.array(), old: req.body });
    }

  },

  profile: (req, res) => { console.log(req.session.usuarioLogueado)
    res.render("profile", {usuario: req.session.usuarioLogueado}) }

}


module.exports = controller