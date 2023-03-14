module.exports = function (sequelize, DataTypes) {
  let alias = "User"
  let cols = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    completeName: {
      type: DataTypes.STRING,
      //allowNull: false,
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
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
     // unique: false,
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
    isAdmin: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  }
  let config = {
    tableName: "users",
    timestamps: false
  }

  let User = sequelize.define(alias, cols, config)


  return User
}