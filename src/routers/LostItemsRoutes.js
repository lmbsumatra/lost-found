const express = require("express");

const router = express.Router();
const {
  LostItemsController,
} = require("../controllers/lost-items/LostItemsController.js");
const { userAuthentication } = require("../middlewares/userAuthentication.js");

router.get("/", LostItemsController.getAll);
router.put("/:id", LostItemsController.updateById);
router.post("/", userAuthentication, LostItemsController.create);
router.delete("/:itemId", LostItemsController.deleteItem)

module.exports = router;
