import { passwordRegex } from "../../../utils/Regex/Regex.js"
import Joi from "joi";

const loginSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .min(5)
    .max(500)
    .required(),
  password: Joi.string()
    .pattern(
      new RegExp(passwordRegex)
    )
    .min(7)
    .max(20)
    .required()
    .messages({
      "string.pattern.base":
        "Password must contain at least one uppercase, lowercase, special character(!@#$%^&*-), and number",
    }),
});

const loginSchemaValidation = (userInput) => {
  return loginSchema.validateAsync(userInput);
};
export default loginSchemaValidation;
