import Joi from "joi";
import { StatusCodes } from "http-status-codes";
import ApiError from "~/utils/ApiError";

const createNew = async (req, res, next) => {
  // Việc validate dữ liệu BẮT BUỘC phải có ở Backend vì đây là điểm cuối để lưu trữ dữ liệu vào Database.
  // Thông thường trong thực tế, điều tốt nhất cho hệ thống là hãy luôn validate dữ liệu ở cả Frontend và Backend.

  const correctCondition = Joi.object({
    title: Joi.string().required().min(3).max(50).trim().strict().messages({
      "any.required": "Title is required",
      "string.empty": "Title is not allowed to be empty",
      "string.min": "Title must be at least 3 characters long",
      "string.max": "Title must not exceed 50 characters",
      "string.trim": "Title must not contain leading or trailing spaces",
    }),
    description: Joi.string().required().min(3).max(256).trim().strict(),
  });

  try {
    await correctCondition.validateAsync(req.body, {
      abortEarly: false, // Validate all errors, not just the first one
    });
    // Validate dữ liệu xong xuôi thì cho request đi tiếp sang controller
    next();
  } catch (error) {
    // const errorMessage = new Error(error).message;
    // const customError = new ApiError(
    //   StatusCodes.UNPROCESSABLE_ENTITY,
    //   errorMessage
    // );
    next(
      new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message)
    );
  }
};

export const boardValidation = { createNew };
