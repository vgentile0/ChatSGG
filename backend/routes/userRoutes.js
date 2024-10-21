const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();
router.post("/register", userController.register);
router.post("/login", userController.login);

router.post("/newFriend", userController.newFriend);
router.get("/:id/all", userController.allFriends);
router.get("/:id/friends-requests", userController.friendsRequests);
router.post("/manage-request", userController.manageRequests);
router.post("/remove-friend", userController.removeFriend);

module.exports = router; 