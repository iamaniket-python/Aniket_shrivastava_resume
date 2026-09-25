const bcrypt = require('bcryptjs');
const sequelize = require('./config/db');
const Admin = require('./models/Admin');
require('dotenv').config();

const seedAdmin = async () => {
  try {
    await sequelize.authenticate();

    const username = 'aniket'; // apna username daal do
    const plainPassword = 'ChangeThis123!'; // apna password daal do

    const existing = await Admin.findOne({ where: { username } });
    if (existing) {
      console.log('⚠️  Admin already exists, skipping seed.');
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    await Admin.create({
      username,
      password: hashedPassword,
    });

    console.log('✅ Admin created successfully');
    process.exit(0);
  } catch (err) {
    console.error('❌ Error seeding admin:', err);
    process.exit(1);
  }
};

seedAdmin();