const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Education = sequelize.define('Education', {
  degree: { type: DataTypes.STRING, allowNull: false },
  institution: { type: DataTypes.STRING, allowNull: false },
  startDate: { type: DataTypes.STRING },
  endDate: { type: DataTypes.STRING },
  description: { type: DataTypes.STRING },
});

module.exports = Education;