const express = require("express");
const {
  registerUser,
  authUser,
  allUsers,
} = require("../controllers/userControllers.js");

const { isAuthenticated } = require("../middlewares/authMiddleware.js");

const router = express.Router();
router.route("/").post(registerUser).get(isAuthenticated, allUsers);
router.route("/login").post(authUser);

module.exports = router;
