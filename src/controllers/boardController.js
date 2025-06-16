import { StatusCodes } from "http-status-codes";

const createNew = async (req, res, next) => {
  try {
    console.log("Request body:", req.body);
    console.log("Request query:", req.query);
    console.log("Request params:", req.params);
    res
      .status(StatusCodes.CREATED)
      .json({ message: "Board created successfully" });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: error.message,
    });
  }
};

export const boardController = { createNew };
