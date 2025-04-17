import dotenv from "dotenv";
import createApp from "./app";
import { testConnection } from "./config/db.config";
import { syncDatabase } from "./models";

// Load environment variables
dotenv.config();

// Port configuration
const PORT = process.env.PORT || 5000;

// Create Express app
const app = createApp();

/**
 * Start the server
 */
const startServer = async (): Promise<void> => {
  try {
    // Test database connection
    await testConnection();

    // Sync database models
    await syncDatabase();

    // Start the server
    app.listen(PORT, () => {
      console.log(
        `Server running on port ${PORT} in ${
          process.env.NODE_ENV || "development"
        } mode`
      );
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

// Start the server
startServer();

// Handle unhandled promise rejections
process.on("unhandledRejection", (err: Error) => {
  console.error("UNHANDLED REJECTION:", err.name, err.message);
  console.error(err.stack);
  // Gracefully shut down the server
  process.exit(1);
});
