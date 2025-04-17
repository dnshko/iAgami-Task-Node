// Job type definitions

// Job attributes interface
export interface JobAttributes {
  id?: number;
  title: string;
  company: string;
  description: string;
  location: string;
  jobType: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Create job request body
export interface CreateJobRequest {
  title: string;
  company: string;
  description: string;
  location: string;
  jobType: string;
}

// Update job request body
export interface UpdateJobRequest extends Partial<CreateJobRequest> {}

// Job response type
export interface JobResponse extends JobAttributes {}