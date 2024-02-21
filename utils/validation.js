const Joi = require("joi");

// Define validation schema for sign-up
const signUpschema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().trim().lowercase().required(),
  password: Joi.string()
    .regex(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{4,25}$/)
    .required(),
});

module.exports = { signUpschema };
