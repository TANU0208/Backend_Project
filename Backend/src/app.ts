import express from "express";
import bodyParser from "body-parser";
import { config } from "./config";
import itemRoutes from "../src/routes/item.routes";
import authRoutes from "../src/routes/auth.routes";
import { logRequest } from "../src/middleware/logger.middleware";
import { handleErrors } from "../src/middleware/error.middleware";

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(logRequest);

// Routes
app.use("/api/items", itemRoutes);
app.use("/api/auth", authRoutes);

// Error handling middleware
app.use(handleErrors);

// Start server
app.listen(config.port, () => {
  console.log(`Server listening on port ${config.port}`);
});
