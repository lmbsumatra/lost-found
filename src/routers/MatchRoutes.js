const express = require("express");
const router = express.Router();
const {
  MatchController,
} = require("../controllers/match-maker/MatchController");
const { userAuthentication } = require("../middlewares/userAuthentication");

router.get(
  "/lost-item/:itemId",
  userAuthentication,
  MatchController.getLostItemMatch
);
router.get(
  "/found-item/:itemId",
  userAuthentication,
  MatchController.getFoundItemMatch
);

module.exports = router;
