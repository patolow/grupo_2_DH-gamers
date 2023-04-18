const {productsList, usersList} = require("../data-access")

//consumo la consulta de la base de datos (data-access/index.js) y armo la lógica

const productsListController = async (req, res) => {
    try {
      const products = await productsList()
      return res.json({
        total: products.length,
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

module.exports = {
  productsListController, 
  usersListController
};