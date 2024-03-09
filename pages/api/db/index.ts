import mongoose from 'mongoose';

export const connectMongoDB = async (req?: any, res?: any) => {
  try {
    await mongoose.connect(process.env.local.MONGODB_URI, {});

    return { success: true, message: 'Connected to MongoDB!' };
  } catch (error) {
    console.error(error);

    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default connectMongoDB;
