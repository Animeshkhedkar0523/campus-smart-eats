import dotenv from 'dotenv';
import mongoose from 'mongoose';
import User from '../models/user.model';

dotenv.config();

const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/campus_smart_eats';

const run = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log('Connected to MongoDB for seeding');

    // Create test customer users
    const testUsers = [
      {
        name: 'John Doe',
        email: 'john@test.com',
        password: 'Test123!',
        role: 'user',
      },
      {
        name: 'Jane Smith',
        email: 'jane@test.com',
        password: 'Test123!',
        role: 'user',
      },
    ];

    for (const testUser of testUsers) {
      const existing = await User.findOne({ email: testUser.email });
      if (existing) {
        console.log(`User ${testUser.email} already exists`);
        continue;
      }

      const user = new User(testUser);
      await user.save();
      console.log(`Created test user: ${testUser.email} with password: ${testUser.password}`);
    }

    console.log('Seeding complete');
    process.exit(0);
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
};

run();