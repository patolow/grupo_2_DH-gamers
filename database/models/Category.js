module.exports = function (sequelize, DataTypes) {
    let alias = "Category"
    let cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING
        }
    }
    let config = {
        tableName: "category", //name of the table in DB
        timestamps: false
    }

    let Category = sequelize.define(alias, cols, config)

    Category.associate = function (models) {
        Category.hasMany(models.Product, {
            as: "product",
            foreignKey: "id_category"
        }),
        Category.hasMany(models.Cart, {
          as: "cart",
          foreignKey: "productCategory"
      })
    }


return Category

}