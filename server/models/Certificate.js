const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Certificate = sequelize.define('Certificate', {
  name: { type: DataTypes.STRING, allowNull: false },
  issuer: { type: DataTypes.STRING, allowNull: false },
  date: { type: DataTypes.STRING },
  credentialUrl: { type: DataTypes.STRING },
});

module.exports = Certificate;