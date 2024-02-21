const Joi = require("joi");
const User = require("../models/user");
const bcrypt = require("bcrypt");

// Define validation schema for sign-up
const signUpschema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .regex(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{4,25}$/)
    .required(),
});

exports.signUpUser = async (req, res) => {
  const { name, email, password } = req.body;

  // Validate user input
  const validationResult = signUpschema.validate({ name, email, password });

  if (validationResult.error) {
    return res
      .status(400)
      .json({ error: validationResult.error.details[0].message });
  }

  try {
    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }

    // Create new user
    const newUser = new User({ name, email, password });
    await newUser.save();

    res.status(201).json({ message: "User signed up successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
