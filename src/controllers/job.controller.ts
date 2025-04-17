import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import Job from "../models/job.model";
import { ApiError } from "../middlewares/error.middleware";
import { sendSuccess } from "../utils/api-response";
import { CreateJobRequest, UpdateJobRequest } from "../types/job.types";

/**
 * Job Controller - Handles all job-related API endpoints
 */
export class JobController {
  /**
   * Get all jobs
   * @route GET /api/jobs
   */
  public static async getAllJobs(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const jobs = await Job.findAll({
        order: [["createdAt", "DESC"]],
      });
      return sendSuccess(res, jobs, "Jobs fetched successfully");
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get job by ID
   * @route GET /api/jobs/:id
   */
  public static async getJobById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const { id } = req.params;
      const job = await Job.findByPk(id);

      if (!job) {
        throw new ApiError(
          `Job with ID ${id} not found`,
          StatusCodes.NOT_FOUND
        );
      }

      return sendSuccess(res, job, "Job fetched successfully");
    } catch (error) {
      next(error);
    }
  }

  /**
   * Create a new job
   * @route POST /api/jobs
   */
  public static async createJob(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const jobData: CreateJobRequest = req.body;

      // Validate required fields
      const requiredFields = [
        "title",
        "company",
        "description",
        "location",
        "jobType",
      ];
      const missingFields = requiredFields.filter(
        (field) => !jobData[field as keyof CreateJobRequest]
      );

      if (missingFields.length > 0) {
        throw new ApiError(
          `Missing required fields: ${missingFields.join(", ")}`,
          StatusCodes.BAD_REQUEST
        );
      }

      const job = await Job.create(jobData);

      return sendSuccess(
        res,
        job,
        "Job created successfully",
        StatusCodes.CREATED
      );
    } catch (error) {
      next(error);
    }
  }

  /**
   * Update job by ID
   * @route PUT /api/jobs/:id
   */
  public static async updateJob(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const { id } = req.params;
      const jobData: UpdateJobRequest = req.body;

      const job = await Job.findByPk(id);

      if (!job) {
        throw new ApiError(
          `Job with ID ${id} not found`,
          StatusCodes.NOT_FOUND
        );
      }

      await job.update(jobData);

      return sendSuccess(res, job, "Job updated successfully");
    } catch (error) {
      next(error);
    }
  }

  /**
   * Delete job by ID
   * @route DELETE /api/jobs/:id
   */
  public static async deleteJob(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const { id } = req.params;
      const job = await Job.findByPk(id);

      if (!job) {
        throw new ApiError(
          `Job with ID ${id} not found`,
          StatusCodes.NOT_FOUND
        );
      }

      await job.destroy();

      return sendSuccess(res, null, "Job deleted successfully");
    } catch (error) {
      next(error);
    }
  }
}
