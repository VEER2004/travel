import mongoose from 'mongoose';
import User from '../models/User.js';
import dotenv from 'dotenv';

dotenv.config();

const updateUserRole = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    const result = await User.updateOne(
      { email: 'admin@example.com' },
      { $set: { role: 'admin' } }
    );

    if (result.modifiedCount > 0) {
      console.log('Successfully updated user role to admin');
    } else {
      console.log('User not found or role already set to admin');
    }

    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

updateUserRole(); 