import mongoose from 'mongoose';

interface isDbconnectedI {
  status: 'error' | 'success';
  message: string;
}
const isDbconnected = async (): Promise<isDbconnectedI> => {
  try {
    const MONGODB_URL = process.env.MONGODB_URL;
    if (typeof MONGODB_URL === 'string') {
      const mongoInstance = await mongoose.connect(MONGODB_URL);

      return {
        status: 'success',
        message: `MongoDB connected with host:${mongoInstance.connection.host}`,
      };
    }

    return {
      status: 'error',
      message: 'failure in loading environment variables ',
    };
  } catch (error) {
    return {
      status: 'error',
      message: `failure in MongoDB connection ${error}`,
    };
  }
};

export default isDbconnected;
