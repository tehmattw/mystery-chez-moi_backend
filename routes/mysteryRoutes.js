const express = require("express");
const tourController = require("./../controllers/mysteryController");
const router = express.Router();

router
  .route("/")
  .get(tourController.getAllMysteries)
  .post(tourController.createMystery);

router
  .route("/:id")
  .get(tourController.getMystery)
  .patch(tourController.updateMystery)
  .delete(tourController.deleteMystery);

module.exports = router;
