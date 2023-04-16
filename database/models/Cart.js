module.exports = function (sequelize, DataTypes) {
  let alias = "Cart"
  let cols = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    productName: {
      type: DataTypes.STRING,
    },
    productPrice: {
      type: DataTypes.FLOAT,
    },
    productCategory: {
      type: DataTypes.INTEGER,
      foreignKey: true
    },
    productStock: {
      type: DataTypes.INTEGER,
    },
    productImage: {
      type: DataTypes.STRING,
    },
    quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    },
    userId: {
      type: DataTypes.STRING,
      foreignKey: true
    }
  }
  let config = {
    tableName: "cart", //name of the table in DB
    timestamps: false
  }

  let Cart = sequelize.define(alias, cols, config)

  Cart.associate = function (models) {
    Cart.belongsTo(models.User, {
      as: "user",
      foreignKey: 'userId'
    }),
      Cart.belongsTo(models.Product, {
        as: "product",
        foreignKey: "productId"
      });
  };

  // sequelize.sync({alter:true}) //para crear la tabla, sino entendí mal debería sacarse el {alter:true}
  //   .then(() => {
  //     console.log('users table (re)created successfully');
  //   }).catch((error) => {
  //     console.error('Unable to create table : ', error);
  //   })

  return Cart;
};