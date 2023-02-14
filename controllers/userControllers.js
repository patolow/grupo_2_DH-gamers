const express = require("express");
const path = require("path");
const fs = require("fs");
const { validationResult } = require('express-validator')
const { Console } = require("console");
const bcrypt = require("bcryptjs")

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
        profilePhoto = '/images/users/' + req.file.filename
      } else {
        profilePhoto = '/images/users/profile-photo-default.jpg'
      }
      //ADD NEW USER
      let newUser = {
        id: users[users.length - 1].id + 1,
        completeName: req.body.fullName,
        userName: req.body.userName,
        birthday: req.body.birthday,
        adress: req.body.domicilio,
        phone: req.body.telefono,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
        confirmPassword: bcrypt.hashSync(req.body.confirmPassword, 10),
        image: profilePhoto
      }
      users.push(newUser)
      fs.writeFileSync(usersFilePath, JSON.stringify(users, null, ' '));
      res.redirect('/');
    }
  },



  getLogin: (req, res) => { res.render("login") },

  login: (req, res) => {

    let errors = validationResult(req);

    if (errors.isEmpty()) {

      let userToLogin = users.find(user => user.email === req.body.email); //vacio o con usuario

      if (!userToLogin) {
        res.render('login', { errors: [{ msg: 'Usuario no encontrado' }] });
      }

      let isPasswordValid = bcrypt.compareSync(req.body.password, userToLogin.password);

      if (!isPasswordValid) {
        res.render('login', { errors: [{ msg: 'Credenciales invalidas. Vuelva a intentarlo' }], old: req.body });
      }

      req.session.usuarioLogueado = userToLogin;
      //rememer password
      if (req.body.rememberPassword != undefined) {
        res.cookie('email', userToLogin.email, { maxAge: 900000 })
      }
      res.redirect("./profile")

    }

    else {
      res.render('login', { errors: errors.array(), old: req.body });
    }

  },

  profile: (req, res) => {
    res.render("profile", { usuario: req.session.usuarioLogueado })
  },

  logout: (req, res) => {
    res.clearCookie('email')
    req.session.destroy();
    res.redirect("/")
  }
}

module.exports = controller