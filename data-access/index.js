const db = require("../database/models");
const Sequelize = require('sequelize');

const productsList = async () => {
  try {
    return await db.Product.findAll({
      include: [{ association: "category" }]
    })
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  productsList,
};