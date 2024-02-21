const express = require("express");
const router = express.Router();
const { signUpUser } = require("../controlllers/users");
const signUpschema = require("../utils/validation");

// POST /signup route with validation middleware
router.post("/signup", signUpUser);

module.exports = router;
