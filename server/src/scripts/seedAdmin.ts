import dotenv from 'dotenv';
import mongoose from 'mongoose';
import User from '../models/user.model';

dotenv.config();

const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/campus_smart_eats';

const run = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log('Connected to MongoDB for seeding');

    const adminEmail = process.env.SEED_ADMIN_EMAIL || 'admin@campussmateats.com';
    const adminPassword = process.env.SEED_ADMIN_PASSWORD || 'AdminPass123!';

    const existing = await User.findOne({ email: adminEmail });
    if (existing) {
      console.log('Admin user already exists:', adminEmail);
      process.exit(0);
    }

    const admin = new User({
      name: 'Admin',
      email: adminEmail,
      password: adminPassword,
      role: 'admin',
    });

    await admin.save();
    console.log('Seeded admin user:', adminEmail, 'password:', adminPassword);
    process.exit(0);
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
};

run();
