
const {productsList} = require("../data-access")

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

module.exports = {
  productsListController,
};