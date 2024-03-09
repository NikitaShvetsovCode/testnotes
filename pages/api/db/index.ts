import mongoose from 'mongoose';

export const connectMongoDB = async (req?: any, res?: any) => {
  try {
    //@ts-ignore
    await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_URI, {});

    return { success: true, message: 'Connected to MongoDB!' };
  } catch (error) {
    console.error(error);

    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default connectMongoDB;
