const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const Project = require('../models/Project');
const Skill = require('../models/Skill');
const Experience = require('../models/Experience');
const About = require('../models/About');
const Education = require('../models/Education');
const Certificate = require('../models/Certificate');

router.use(authMiddleware); // niche ke saare routes protected hain

// ---------- PROJECT CRUD ----------
router.post('/projects', async (req, res) => {
  try {
    const project = await Project.create(req.body);
    res.status(201).json(project);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.put('/projects/:id', async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id);
    if (!project) return res.status(404).json({ error: 'Project not found' });
    await project.update(req.body);
    res.json(project);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete('/projects/:id', async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id);
    if (!project) return res.status(404).json({ error: 'Project not found' });
    await project.destroy();
    res.json({ message: 'Project deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ---------- SKILL CRUD ----------
router.post('/skills', async (req, res) => {
  try {
    const skill = await Skill.create(req.body);
    res.status(201).json(skill);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.put('/skills/:id', async (req, res) => {
  try {
    const skill = await Skill.findByPk(req.params.id);
    if (!skill) return res.status(404).json({ error: 'Skill not found' });
    await skill.update(req.body);
    res.json(skill);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete('/skills/:id', async (req, res) => {
  try {
    const skill = await Skill.findByPk(req.params.id);
    if (!skill) return res.status(404).json({ error: 'Skill not found' });
    await skill.destroy();
    res.json({ message: 'Skill deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ---------- EXPERIENCE CRUD ----------
router.post('/experience', async (req, res) => {
  try {
    const exp = await Experience.create(req.body);
    res.status(201).json(exp);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.put('/experience/:id', async (req, res) => {
  try {
    const exp = await Experience.findByPk(req.params.id);
    if (!exp) return res.status(404).json({ error: 'Experience not found' });
    await exp.update(req.body);
    res.json(exp);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete('/experience/:id', async (req, res) => {
  try {
    const exp = await Experience.findByPk(req.params.id);
    if (!exp) return res.status(404).json({ error: 'Experience not found' });
    await exp.destroy();
    res.json({ message: 'Experience deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ---------- ABOUT (single row, upsert) ----------
router.put('/about', async (req, res) => {
  try {
    let about = await About.findOne();
    if (about) {
      await about.update(req.body);
    } else {
      about = await About.create(req.body);
    }
    res.json(about);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ---------- EDUCATION CRUD ----------
router.post('/education', async (req, res) => {
  try {
    const edu = await Education.create(req.body);
    res.status(201).json(edu);
  } catch (err) { res.status(400).json({ error: err.message }); }
});

router.put('/education/:id', async (req, res) => {
  try {
    const edu = await Education.findByPk(req.params.id);
    if (!edu) return res.status(404).json({ error: 'Not found' });
    await edu.update(req.body);
    res.json(edu);
  } catch (err) { res.status(400).json({ error: err.message }); }
});

router.delete('/education/:id', async (req, res) => {
  try {
    const edu = await Education.findByPk(req.params.id);
    if (!edu) return res.status(404).json({ error: 'Not found' });
    await edu.destroy();
    res.json({ message: 'Deleted' });
  } catch (err) { res.status(400).json({ error: err.message }); }
});

// ---------- CERTIFICATE CRUD ----------
router.post('/certificates', async (req, res) => {
  try {
    const cert = await Certificate.create(req.body);
    res.status(201).json(cert);
  } catch (err) { res.status(400).json({ error: err.message }); }
});

router.put('/certificates/:id', async (req, res) => {
  try {
    const cert = await Certificate.findByPk(req.params.id);
    if (!cert) return res.status(404).json({ error: 'Not found' });
    await cert.update(req.body);
    res.json(cert);
  } catch (err) { res.status(400).json({ error: err.message }); }
});

router.delete('/certificates/:id', async (req, res) => {
  try {
    const cert = await Certificate.findByPk(req.params.id);
    if (!cert) return res.status(404).json({ error: 'Not found' });
    await cert.destroy();
    res.json({ message: 'Deleted' });
  } catch (err) { res.status(400).json({ error: err.message }); }
});

module.exports = router;