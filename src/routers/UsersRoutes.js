const express = require("express");

const router = express.Router();
const { UsersController } = require("../controllers/users/UsersController.js");

router.get("/", UsersController.getAll);
router.post("/:id", UsersController.updateById);

module.exports = router;
