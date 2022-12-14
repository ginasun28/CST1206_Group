const express = require("express");
const router = express.Router();
const validateToken = require("../../middleware/validate");

// Here we are using destructuring
const { registerUser, loginUser, getAllUsers } = require("../controller/user");

// router.get("/", userController.getAllUsers)

router.get("/", validateToken, getAllUsers);

// Registering
router.post("/register", registerUser);

// // Login
router.post("/login", loginUser);

// router.get("/:id", userController.getUserById)

module.exports = router;
