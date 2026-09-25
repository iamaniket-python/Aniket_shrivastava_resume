const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Skill = sequelize.define('Skill', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING, // 'Frontend', 'Backend', 'Database', 'Tools'
    allowNull: false,
  },
  proficiency: {
    type: DataTypes.INTEGER, // optional: 1-100
    defaultValue: 80,
  },
});

module.exports = Skill;