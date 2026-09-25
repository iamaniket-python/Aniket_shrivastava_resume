const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const Skill = require('../models/Skill');
const Experience = require('../models/Experience');
const About = require('../models/About');
const Education = require('../models/Education');
const Certificate = require('../models/Certificate');

// GET all projects
router.get('/projects', async (req, res) => {
  try {
    const projects = await Project.findAll({ order: [['order', 'ASC']] });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET all skills
router.get('/skills', async (req, res) => {
  try {
    const skills = await Skill.findAll();
    res.json(skills);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET all experience
router.get('/experience', async (req, res) => {
  try {
    const experience = await Experience.findAll({ order: [['startDate', 'DESC']] });
    res.json(experience);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET about info (single row)
router.get('/about', async (req, res) => {
  try {
    const about = await About.findOne();
    res.json(about);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/education', async (req, res) => {
  try {
    const education = await Education.findAll();
    res.json(education);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/certificates', async (req, res) => {
  try {
    const certificates = await Certificate.findAll();
    res.json(certificates);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;