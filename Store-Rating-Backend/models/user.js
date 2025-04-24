const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('User', {
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
  address: DataTypes.STRING,
  role: { type: DataTypes.ENUM('admin', 'normal', 'owner'), defaultValue: 'normal' },
});

module.exports = User;