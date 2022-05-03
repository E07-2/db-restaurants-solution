import express from "express";
import Restaurant from "../models/Restaurant.js";
import { StatusCodes } from "http-status-codes";

const router = express.Router();

router.get("/all", async (req, res) => {
  const restaurants = await Restaurant.find().limit(10).lean();

  res.send(restaurants);
});

router.get("/id/:restaurantId", async (req, res) => {
  try {
    const { restaurantId } = req.params;

    // returns an object OR null
    const restaurant = await Restaurant.findById(restaurantId).lean();

    if (restaurant === null) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .send("No restaurant by that ID can be found");
    }

    res.status(StatusCodes.OK).send(restaurant);
  } catch (error) {
    res.status(StatusCodes.BAD_GATEWAY).send(error.message);
  }
});

router.get("/name/:name", async (req, res) => {
  try {
    const { name } = req.params;
    let { limit } = req.query; // optional

    if (limit === undefined) {
      // only runs if the client does not include the limit
      limit = 10;
    }

    // find always returns an array, [Object...] OR []
    const restaurants = await Restaurant.find({ name }).limit(limit).lean();

    if (restaurants.length === 0) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .send("No restaurants can be found");
    }

    res.status(StatusCodes.OK).send(restaurants);
  } catch (error) {
    res.status(StatusCodes.BAD_GATEWAY).send(error.message);
  }
});

export default router;
