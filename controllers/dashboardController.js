const {productsList, usersList, categoryList} = require("../data-access")
const db = require("../database/models");
const Sequelize = require('sequelize');

//consumo la consulta de la base de datos (data-access/index.js) y armo la lógica

const productsListController = async (req, res) => {
    try {
      const products = await productsList()
      return res.json({
        total: products.length,
        GPU: products.filter(item => item.category.name === "GPU").length,
        Monitores: products.filter(item => item.category.name === "Monitores").length,
        Microprocesadores: products.filter(item => item.category.name === "Microprocesadores").length,
        Motherboards: products.filter(item => item.category.name === "Motherboards").length,
        WaterCooling: products.filter(item => item.category.name === "WaterCooling").length,
        Joysticks: products.filter(item => item.category.name === "Joysticks").length,
        Others: products.filter(item => item.category.name === "Others").length,
        data: products,
        status: 200
      })
    } catch (error) {
      console.log(error)
    }
}

const usersListController = async (req, res) => {
  try {
    const users = await usersList()
    return res.json({
      total: users.length,
      data: users,
      status: 200
    })
  } catch (error) {
    console.log(error)
  }
}

const categoryListController = async (req, res) => {
  try {
    const category = await categoryList()
    return res.json({
      total: category.length,
      data: category,
      status: 200
    })
  } catch (error) {
    console.log(error)
  }
}

//Products detail

const productsDetailController = (req, res)=> {
  db
  .Product.findByPk(req.params.id)
  .then(product => {
    return res.json({
      data: product,
      status: 200
    })
  })
}

const userDetailController = (req, res)=> {
  db
  .User.findByPk(req.params.id)
  .then(user => {
    return res.json({
      data: user,
      status: 200
    })
  })
}

module.exports = {
  productsListController, 
  usersListController,
  categoryListController,
  productsDetailController,
  userDetailController
};