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

  let Users = sequelize.define(alias, cols, config)

  Users.associate = function (models) {
    Users.hasMany(models.Purchase, {
      as: "purchases",
      foreignKey: "id_user"
    })
  }


  // User.associate = function (models) {
  //   User.hasMany(models.Purchases, {
  //     as: "purchases",
  //     foreignKey: "id_user"
  //   })
  // }
  // sequelize.sync({alter:true}). //para crear la tabla, sino entendí mal debería sacarse el {alter:true}
  //   then(() => {
  //     console.log('users table (re)created successfully');
  //   }).catch((error) => {
  //     console.error('Unable to create table : ', error);
  //   })

  return Users
}