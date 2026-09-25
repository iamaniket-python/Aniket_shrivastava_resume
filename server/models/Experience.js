const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Experience = sequelize.define('Experience', {
  company: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  startDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  endDate: {
    type: DataTypes.DATEONLY, // null = currently working
  },
  description: {
    type: DataTypes.TEXT,
  },
});

module.exports = Experience;