import express from "express";
import {
  createTour,
  deleteTour,
  getAllTour,
  getSingleTour,
  updateTour,
  getTourBySearch,
  getFeaturedTour,
  getTourCount,
} from "../controllers/tourController.js";

import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

// create new Tour
router.post("/", verifyAdmin, createTour);

// update Tour
router.put("/:id", verifyAdmin, updateTour);

// delete  Tour
router.delete("/:id", verifyAdmin, deleteTour);

// get single Tour
router.get("/:id", getSingleTour);

// get all Tour
router.get("/", getAllTour);

// search tour
router.get("/search/getTourBySearch", getTourBySearch);

// feature tour (~ tour noi bat)
router.get("/search/getFeaturedTours", getFeaturedTour);

// get tour count
router.get("/search/getTourCount", getTourCount);

export default router;
