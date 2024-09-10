const express = require("express");

const router = express.Router();

const usersController = require("../services/users");

router.post("/login", usersController.login);

module.exports = router;
