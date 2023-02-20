module.exports = function (sequelize, DataTypes) {
  let alias = "User"
  let cols = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    completeName: {
      type: DataTypes.STRING,
    },
    userName: {
      type: DataTypes.STRING,
    },
    birthday: {
      type: DataTypes.DATE,
    },
    address: {
      type: DataTypes.STRING,
    },
    phone: {
      type: DataTypes.INTEGER,
    },
    email: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    confirmPassword: {
      type: DataTypes.STRING,
    },
    image: {
      type: DataTypes.STRING,
    },
  }
  let config = {
    tableName: "Users",
    timestamps: false
  }

  let User = sequelize.define(alias, cols, config)

  return User
}