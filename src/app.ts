import express, { Express } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import jobRoutes from "./routes/job.routes";
import { errorHandler, notFoundHandler } from "./middlewares/error.middleware";

/**
 * Express application setup
 */
const createApp = (): Express => {
  const app = express();

  // Middleware
  app.use(helmet()); // Set security HTTP headers
  app.use(cors()); // Enable CORS
  app.use(express.json()); // Parse JSON request body
  app.use(express.urlencoded({ extended: true })); // Parse URL-encoded request body

  // Request logging
  if (process.env.NODE_ENV !== "test") {
    app.use(
      morgan(process.env.NODE_ENV === "development" ? "dev" : "combined")
    );
  }

  // Health check endpoint
  app.get("/health", (req, res) => {
    res.status(200).json({ status: "ok", message: "Server is running" });
  });

  // API Routes
  app.use("/api/jobs", jobRoutes);

  // Error handling middleware
  app.use("*", notFoundHandler);
  app.use(errorHandler);

  return app;
};

export default createApp;
