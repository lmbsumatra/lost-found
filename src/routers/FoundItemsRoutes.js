const express = require("express");

const router = express.Router();
const {
  FoundItemsController,
} = require("../controllers/found-items/FoundItemsController");
const { userAuthentication} = require("../middlewares/userAuthentication");

router.get("/", FoundItemsController.getAll);
router.put("/:id", FoundItemsController.updateById);
router.post("/", userAuthentication, FoundItemsController.create);
router.delete("/:itemId", FoundItemsController.deleteItem)

module.exports = router;
