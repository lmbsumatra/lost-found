const express = require("express");

const router = express.Router();
const {
  LostItemsController,
} = require("../controllers/lost-items/LostItemsController.js");

router.get("/", LostItemsController.getAll);
router.post("/:id", LostItemsController.updateById)

module.exports = router;
