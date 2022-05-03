import express from "express";
import { StatusCodes } from "http-status-codes";

import Restaurant from "../models/Restaurant.js";

const router = express.Router();

router.patch("/name/:restaurantId", async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const { name } = req.body;

    if (name === undefined) {
      return res
        .status(StatusCodes.EXPECTATION_FAILED)
        .send("No name was provided");
    }

    await Restaurant.findByIdAndUpdate(restaurantId, {
      name,
    });

    res.status(StatusCodes.OK).send("The document was updated");
  } catch (error) {
    res.status(StatusCodes.BAD_GATEWAY).send(error.message);
  }
});

export default router;
