const express = require('express');
const cors = require('cors');
require('dotenv').config();
const sequelize = require('./config/db');
const Project = require('./models/Project');
const Skill = require('./models/Skill');
const Experience = require('./models/Experience');
const About = require('./models/About');
const Admin = require('./models/Admin');
const publicRoutes = require('./routes/publicRoutes');
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const Education = require('./models/Education');
const Certificate = require('./models/Certificate');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', publicRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes); 

app.get('/', (req, res) => {
  res.send('Portfolio API is running');
});

const PORT = process.env.PORT || 5000;

sequelize
  .authenticate()
  .then(() => {
    console.log('✅ PostgreSQL connected successfully');
    return sequelize.sync(); 
  })
  .then(() => {
    console.log('✅ Models synced');
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('❌ Error:', err);
  });