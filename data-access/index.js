const db = require("../database/models");
const Sequelize = require('sequelize');

//Son funciones sólo de consulta a la base de datos, que luego consume el controller.

const productsList = async () => {
  try {
    return await db.Product.findAll({
      include: [{ association: "category" }]
    })
  } catch (error) {
    console.log(error)
  }
}

const usersList = async () => {
  try {
    return await db.User.findAll( )
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  productsList, 
  usersList
};