const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Admin = sequelize.define('Admin', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING, // hashed
    allowNull: false,
  },
});

module.exports = Admin;