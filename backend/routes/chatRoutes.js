const express = require("express");
const { isAuthenticated } = require("../middlewares/authMiddleware");
const {
  accessChat,
  fetchChats,
  createGroupChat,
  renameGroup,
  removeFromGroup,
  addToGroup,
} = require("../controllers/chatControllers.js");
const router = express.Router();

router
  .route("/")
  .post(isAuthenticated, accessChat)
  .get(isAuthenticated, fetchChats);

router.route("/group").post(isAuthenticated, createGroupChat);
router.route("/rename").put(isAuthenticated, renameGroup);
router.route("/groupremove").put(isAuthenticated, removeFromGroup);
router.route("/groupadd").put(isAuthenticated, addToGroup);

module.exports = router;
