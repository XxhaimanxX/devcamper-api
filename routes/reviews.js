const express = require("express");
const {
  getReivews,
  getReivew,
  addReivew,
  updateReivew,
  deleteReivew
} = require("../controllers/reviews");

const Review = require("../models/Review");

const router = express.Router({ mergeParams: true });

const advancedResults = require("../middleware/advancedResults");

const { protect, authorize } = require("../middleware/auth");

router
  .route("/")
  .get(
    advancedResults(Review, {
      path: "bootcamp",
      select: "name description"
    }),
    getReivews
  )
  .post(protect, authorize("user", "admin"), addReivew);

router
  .route("/:id")
  .get(getReivew)
  .put(protect, authorize("user", "admin"), updateReivew)
  .delete(protect, authorize("user", "admin"), deleteReivew);

module.exports = router;
