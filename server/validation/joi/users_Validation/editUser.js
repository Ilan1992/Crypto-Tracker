import Joi from "joi";
import {phoneRegex} from "../../../utils/Regex/Regex.js";

const editUserSchema = Joi.object({
  name: Joi.object()
    .keys({
      first: Joi.string().min(2).max(256).required(),
      // middle: Joi.string().min(2).max(256).allow(""),
      last: Joi.string().min(2).max(256).required(),
    })
    .required(),
  phone: Joi.string().pattern(phoneRegex).required(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .min(5)
    .max(500),
  image: Joi.object().keys({
    url: Joi.string()
      .uri({ scheme: ["http", "https"] })
      .allow(""),
    alt: Joi.string().min(2).max(256).allow("").when("url", {
      is: Joi.exist(),
      then: Joi.required(),
    }),
  }),
  address: Joi.object()
    .keys({
      state: Joi.string().min(2).max(256).allow(""),
      country: Joi.string().min(2).max(256).required(),
      city: Joi.string().min(2).max(256).required(),
      // street: Joi.string().min(2).max(256).required(),
      // houseNumber: Joi.number().min(1).max(256).required(),
      // zip: Joi.number().min(1).max(9999999).required(),
    })
    .required(),
  FavoriteCoins: Joi.array().allow(""),
});

const editUserSchemaValidation = (userInput) => {
  return editUserSchema.validateAsync(userInput);
};

export default editUserSchemaValidation;
