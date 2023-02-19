'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];
const db = {};
/*
const sequelize = new Sequelize('postgres://dhgamersadmin:$dbpass123456@dh-gamers.mysql.database.azure.com:3306/dh-gamers',{
  dialectModule: 'mysql'
});
*/
//const sequelize = new Sequelize('dh-gamers.mysql.database.azure.com', 'dhgamersadmin', '$dbpass123456', { dialect: 'mysql', sync: {force: true}, syncOnAssociation: true, pool: { maxConnections: 5, maxIdleTime: 30} })
var sequelize = new Sequelize(
  'dh-gamers',
  'dhgamersadmin',
  '$dbpass123456',
  {
      port: 3306,
      dialect: 'mysql',
      host: 'dh-gamers.mysql.database.azure.com',
      logging: console.log,
      define: {
          timestamps: false
      }
  }
);


sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
/*
let sequelize
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}
*/

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
