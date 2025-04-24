const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Store = sequelize.define('Store', {
  name: DataTypes.STRING,
  email: DataTypes.STRING,
  address: DataTypes.STRING,
});

module.exports = Store;