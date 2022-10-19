const express = require("express");
const {
  sendMessage,
  allMessages,
} = require("../controllers/messageControllers");
const { isAuthenticated } = require("../middlewares/authMiddleware");

const router = express.Router();

router.route("/").post(isAuthenticated, sendMessage);
router.route("/:chatId").get(isAuthenticated, allMessages);

module.exports = router;
