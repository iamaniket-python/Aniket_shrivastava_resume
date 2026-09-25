const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const About = sequelize.define('About', {
  bio: {
    type: DataTypes.TEXT,
  },
  resumeUrl: {
    type: DataTypes.STRING,
  },
  githubUrl: {
    type: DataTypes.STRING,
  },
  linkedinUrl: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
  },
});

module.exports = About;