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
      allowNull: false
    },
    productPrice: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    productCategory: {
      type: DataTypes.STRING,
      allowNull: false
    },
    productStock: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    productImage: {
      type: DataTypes.STRING,
      allowNull: false
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
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
      as: "cart",
      foreignKey: 'userId'
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