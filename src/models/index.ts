import sequelize from '../config/db.config';
import Job from './job.model';

// Initialize all models
const models = {
  Job,
};

// Sync database - this creates tables if they don't exist
// In production, want to use migrations instead
export const syncDatabase = async (): Promise<void> => {
  try {
    await sequelize.sync({ alter: process.env.NODE_ENV === 'development' });
    console.log('Database synchronized successfully');
  } catch (error) {
    console.error('Unable to synchronize the database:', error);
    throw error;
  }
};

export { sequelize };
export default models;