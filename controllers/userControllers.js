const express = require("express");
const path = require("path");
const fs = require("fs");
const { validationResult } = require('express-validator')
const { Console } = require("console");
const bcrypt = require("bcryptjs")
const db = require("../database/models")


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
        completeName: req.body.completeName,
        userName: req.body.userName,
        birthday: req.body.birthday,
        address: req.body.address,
        phone: req.body.phone,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
        confirmPassword: bcrypt.hashSync(req.body.confirmPassword, 10),
        image: profilePhoto
      }

      db.User
        .create(newUser)
        .then((newUser) => {
          return res.redirect('./login');
        })
        .catch(error => console.log(error));

    }
  },

  getLogin: (req, res) => { res.render("login") },

  getLogin: (req, res) => { res.render("login") },

  login: (req, res) => {

    let errors = validationResult(req);

    if(req.session?.usuarioLogueado){
      return res.redirect("./profile")
    }

    if (errors.isEmpty()) {

      let userToLogin = db.User.findOne({
          where: { email: req.body.email }
        })
        .then(userToLogin => {
          userToLogin = userToLogin.dataValues
          if (!userToLogin) {
            res.render('login', { errors: [{ msg: 'Usuario no encontrado' }] });
          }

          let isPasswordValid = bcrypt.compareSync(req.body.password, userToLogin.password);

          if (!isPasswordValid) {
           return res.render('login', { errors: [{ msg: 'Credenciales invalidas. Vuelva a intentarlo' }], old: req.body });
          }

          req.session.usuarioLogueado = userToLogin;
          //rememer password
          if (req.body.rememberPassword) {
            res.cookie('email', userToLogin.email, { maxAge: 900000 })
          }
          res.redirect("./profile")
        })
        .catch(error => {
          console.error("Error al intentar loguearse: ", error);
          res.status(500).send('Error al intentar loguearse.');
        })
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
  },

  getEditUser: (req, res) => {
    db.User.findByPk(req.params.id)
        .then(function(usuario){
            res.render("userEdit", {usuario:usuario});
        })
  },

  
  editUser: (req, res) => {
    let profilePhoto = ''
      if (req.file) {
        profilePhoto = '/images/users/' + req.file.filename
      } else {
        profilePhoto = '/images/users/profile-photo-default.jpg'
      }

    const updateData = {
    completeName: req.body.completeName,
    userName: req.body.userName, 
    birthday: req.body.birthday,
    address: req.body.address,
    phone: req.body.phone,
    email: req.body.email,
    image: profilePhoto
  };
  
  if (req.body.password) {
    updateData.password = bcrypt.hashSync(req.body.password, 10);
  }
  
  if (req.body.confirmPassword) {
    updateData.confirmPassword = bcrypt.hashSync(req.body.confirmPassword, 10);
  }
  
  db.User.update(updateData, {
    where: { id: req.params.id }
  })
  .then(user => {
    console.log(user)
    const userUrl = "/users/profile";
    return res.redirect(userUrl);
  })
  .catch(error => {
    console.error("Error al editar el usuario: ", error);
    res.status(500).send('Error al editar el usuario.');
  });
}

  }


module.exports = controller
