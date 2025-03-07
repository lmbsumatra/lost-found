const express = require("express");

const router = express.Router();
const {
  FoundItemsController,
} = require("../controllers/found-items/FoundItemsController");

router.get("/", FoundItemsController.getAll);
router.post("/:id", FoundItemsController.updateById);

module.exports = router;
