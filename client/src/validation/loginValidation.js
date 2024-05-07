import Joi from "joi";

const emailLoginSchema = Joi.object({
  email: Joi.string().email({ tlds: false }).min(5).required(),
});
const passwordLoginSchema = Joi.object({
  password: Joi.string()
    .pattern(
      new RegExp(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*-])[A-Za-z\d!@#$%^&*-]{6,}$/
      )
    )
    .min(8)
    .max(20)
    .required()
    .messages({
      "string.pattern.base":
        "Password must contain 8 letters and at least one uppercase, lowercase, special character(!@#$%^&*-), and number",
    }),
});

const validateEmailLogin = (email) => emailLoginSchema.validate(email);
const validatePasswordLogin = (password) => passwordLoginSchema.validate(password);

export { validateEmailLogin, validatePasswordLogin};
