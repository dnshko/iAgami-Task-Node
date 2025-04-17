import { Router } from "express";
import { JobController } from "../controllers/job.controller";

// Create router instance
const router = Router();

/**
 * @route /api/jobs
 */
router.get("/", JobController.getAllJobs); // Get all jobs
router.post("/", JobController.createJob); // Create a new job

/**
 * @route /api/jobs/:id
 */
router.get("/:id", JobController.getJobById); // Get a specific job
router.put("/:id", JobController.updateJob); // Update a job
router.delete("/:id", JobController.deleteJob); // Delete a job

export default router;
