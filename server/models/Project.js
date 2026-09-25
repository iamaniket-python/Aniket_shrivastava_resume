const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Project = sequelize.define('Project', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  techStack: {
    type: DataTypes.ARRAY(DataTypes.STRING), // e.g. ['React', 'Node', 'Postgres']
    allowNull: false,
    defaultValue: [],
  },
  githubLink: {
    type: DataTypes.STRING,
  },
  liveLink: {
    type: DataTypes.STRING,
  },
  imageUrl: {
    type: DataTypes.STRING,
  },
  featured: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  order: {
    type: DataTypes.INTEGER,
    defaultValue: 0, // dashboard se reorder karne ke liye
  },
});

module.exports = Project;