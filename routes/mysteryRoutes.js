const express = require("express");
const mysteryController = require("../controllers/mysteryController");

const router = express.Router();

router
  .route("/top-mysteries")
  .get(mysteryController.aliasTopMysteries, mysteryController.getAllMysteries);

router
  .route("/")
  .get(mysteryController.getAllMysteries)
  .post(mysteryController.createMystery);

router
  .route("/:id")
  .get(mysteryController.getMystery)
  .patch(mysteryController.updateMystery)
  .delete(mysteryController.deleteMystery);

module.exports = router;
