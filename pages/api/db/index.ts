import mongoose from 'mongoose';

export const connectMongoDB = async (req?: any, res?: any) => {
  try {
    //@ts-ignore
    await mongoose.connect(process.env.MONGODB_URI, {});

    return { success: true, message: 'Connected to MongoDB!' };
  } catch (error) {
    console.error(error);
  }
};

export default connectMongoDB;
