import { StatusCodes } from "http-status-codes";

const createNew = async (req, res, next) => {
  try {
    // console.log("Request body:", req.body);
    // console.log("Request query:", req.query);
    // console.log("Request params:", req.params);
    res
      .status(StatusCodes.CREATED)
      .json({ message: "Board created successfully" });

    // throw new ApiError(StatusCodes.BAD_REQUEST, "la dai loc test err");
  } catch (error) {
    next(error);
  }
};

export const boardController = { createNew };
