// utils/seed.js
require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const User = require('../models/User');
const Item = require('../models/Item');
const bcrypt = require('bcryptjs');

const seed = async () => {
  await connectDB();
  await User.deleteMany({});
  await Item.deleteMany({});

  const salt = await bcrypt.genSalt(10);
  const adminPass = await bcrypt.hash('admin123', salt);
  const patronPass = await bcrypt.hash('patron123', salt);

  const admin = await User.create({ name: 'Admin', email: 'admin@lms.com', password: adminPass, role: 'admin' });
  const patron = await User.create({ name: 'Patron', email: 'patron@lms.com', password: patronPass, role: 'user' });

  const items = [
    { title: 'Intro to Programming', author: 'John Doe', category: 'Computer Science', quantity: 3 },
    { title: 'Data Structures', author: 'Jane Roe', category: 'Computer Science', quantity: 2 },
    { title: 'Design Patterns', author: 'Gamma', category: 'Software Engineering', quantity: 1 }
  ];
  await Item.insertMany(items);

  console.log('Seed completed');
  process.exit(0);
};

seed().catch(err => { console.error(err); process.exit(1); });