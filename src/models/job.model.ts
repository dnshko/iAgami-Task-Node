import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/db.config';
import { JobAttributes } from '../types/job.types';

// Interface for Job Model creation attributes
interface JobCreationAttributes extends Optional<JobAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

// Job model class definition
class Job extends Model<JobAttributes, JobCreationAttributes> implements JobAttributes {
  public id!: number;
  public title!: string;
  public company!: string;
  public description!: string;
  public location!: string;
  public jobType!: string;
  
  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// Initialize Job model
Job.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    company: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    jobType: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: 'jobs',
    sequelize,
    timestamps: true,
  }
);

export default Job;