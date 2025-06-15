import express from "express";
import { StatusCodes } from "http-status-codes";
import { boardRoute } from "./boardRoute";
const router = express.Router();

// Check API status
router.get("/status", (req, res) => {
  res.status(StatusCodes.OK).json({ message: "API v1 " });
});

// Board API routes
router.use("/boards", boardRoute);

export const APIs_V1 = router;
