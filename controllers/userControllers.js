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
      let password = req.body.password
      let confirmPassword = req.body.confirmPassword
      if (password == confirmPassword) {
        password = bcrypt.hashSync(password, 10)
      }
      //ADD NEW USER
      let newUser = {
        completeName: req.body.completeName,
        userName: req.body.userName,
        birthday: req.body.birthday,
        address: req.body.address,
        phone: req.body.phone,
        email: req.body.email,
        password: password,
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
    console.log(errors)

    if (req.session?.usuarioLogueado) {
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
          return res.render('login', { errors: [{ msg: 'Credenciales invalidas. Vuelva a intentarlo' }], old: req.body });
        })
    }

    else {
        res.render('login', { 
          errors: errors.array(),  // aquí se envía solo el array de errores
          old: req.body 
        });
      }
      

  },


  profile: (req, res) => {
    let usuarioLogueado = req.session.usuarioLogueado
    // console.log(usuarioLogueado);
    db.User.findByPk(usuarioLogueado.id)
      .then(function (usuario) {
        res.render("profile", { usuario: usuarioLogueado, usuarioBase: usuario })
      })
  },

  logout: (req, res) => {
    res.clearCookie('email')
    req.session.destroy();
    res.redirect("/")
  },

  getEditUser: (req, res) => {
    db.User.findByPk(req.params.id)
      .then(function (usuario) {
        res.render("userEdit", { usuario: usuario });
      })
  },


  editUser: (req, res) => {
    let errors = validationResult(req);
    if (errors.isEmpty()) {

      // let profilePhoto = ''
      // if (req.file) {
      //   profilePhoto = '/images/users/' + req.file.filename
      // }
      // if ()
      // else {
      //   profilePhoto = '/images/users/profile-photo-default.jpg'
      // }

      
      let profilePhoto = ''
      if (req.file) {
        profilePhoto = '/images/users/' + req.file.filename
      } else {
        profilePhoto = db.User.image
      }
      
      console.log(req.file);
      
      let password = req.body.password
      let confirmPassword = req.body.confirmPassword
      if (password && password == confirmPassword) {
        password = bcrypt.hashSync(password, 10)
      } else {
        password = db.User.password
      }
      
      const updateData = {
        completeName: req.body.completeName,
        userName: req.body.userName,
        birthday: req.body.birthday,
        address: req.body.address,
        phone: req.body.phone,
        email: req.body.email,
        image: profilePhoto,
        password: password,
      };
      
      db.User.update(updateData, {
        where: { id: req.params.id }
      })
      
        .then(user => {

          return res.redirect("/users/profile");
        })
        .catch(error => {
          console.error("Error al editar el usuario: ", error);
          res.status(500).send('Error al editar el usuario.');
        });
    } else {


      res.render('userEdit', { errors: errors.mapped(), usuario: { ...req.body, id: req.params.id } });
    }

  }

}


module.exports = controller
