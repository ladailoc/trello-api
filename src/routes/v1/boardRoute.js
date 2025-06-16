import express from "express";
import { StatusCodes } from "http-status-codes";
import { boardValidation } from "~/validations/boardValidation";
import { boardController } from "~/controllers/boardController";
const router = express.Router();

router
  .route("/")
  .get((req, res) => {
    res.status(StatusCodes.OK).json({ message: "Board API v1 get list" });
  })
  .post(boardValidation.createNew, boardController.createNew);

export const boardRoute = router;
