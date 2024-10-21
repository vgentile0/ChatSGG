const express = require("express");
const messageController = require("../controllers/messageController");

const router = express.Router();
router.post("/addMsg", messageController.addMsg);
router.post("/getMsgs", messageController.getMsgs);

module.exports = router; 