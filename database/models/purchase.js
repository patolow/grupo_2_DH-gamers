module.exports = function (sequelize, DataTypes) {
  let alias = "Purchase"
  let cols = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    purchaseDate: {
      type: DataTypes.DATE
    },
    total: {
      type: DataTypes.INTEGER
    },
    id_user: {
      type: DataTypes.STRING,
      foreignKey: true
    }
  }

  let config = {
    tableName: "purchase", //name of the table in DB
    timestamps: false
  }

  let Purchase = sequelize.define(alias, cols, config)


  Purchase.associate = function (models) {   // un producto tiene un solo genero
    Purchase.belongsTo(models.User, {
      as: "purchases",
      foreignKey: "id_user"
    })
  }
  
  return Purchase

}