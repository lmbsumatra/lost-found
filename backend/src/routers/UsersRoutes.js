const express = require("express");

const router = express.Router();
const { UsersController } = require("../controllers/users/UsersController.js");

router.get("/", UsersController.getAll);
router.put("/:id", UsersController.updateById);
router.post("/", UsersController.create);
router.delete("/:userId", UsersController.deleteUser);

module.exports = router;
