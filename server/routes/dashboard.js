const express = require("express");

const {
  getUsers,
  getUserById,
  deleteUser,
} = require("../controller/dashboardController");
const authenticate = require("../middleware/authentication");
const router = express.Router();

router.get("/", authenticate, getUsers);
router.put("/:id", authenticate, getUserById);
router.delete("/delete/:id", authenticate, deleteUser);

module.exports = router;
