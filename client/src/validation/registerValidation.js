import Joi  from "joi";

import {  validateEmailLogin, validatePasswordLogin } from "./loginValidation";

const firstSchema = Joi.object({
  first: Joi.string().min(2).max(256).required(),
})
const validateFirstSchema = (first) => firstSchema.validate(first);


const lastSchema = Joi.object({
  last : Joi.string().min(2).max(256).required(),
});
const validateLastSchema = (last) => lastSchema.validate(last);

const phoneSchema = Joi.object({
  phone: Joi.string().min(9).max(11).required(),
});
const validatePhoneSchema = (phone)=> phoneSchema.validate(phone);

const urlSchema = Joi.object({
  url: Joi.string().min(14).allow(""),
});
const validateUrlSchema = (url) => urlSchema.validate(url);

const altSchema = Joi.object({
  alt: Joi.string().min(2).max(256).allow(""),
});
const validateAltSchema = (alt) => altSchema.validate(alt);

const stateSchema = Joi.object({
  state: Joi.string().min(2).max(256).allow(""),
});
const validateStateSchema = (state) => stateSchema.validate(state);

const countrySchema = Joi.object({
  country: Joi.string().min(2).max(256).required(),
})
const validateCountrySchema = (country)=> countrySchema.validate(country);

const citySchema = Joi.object({
  city: Joi.string().min(2).max(256).required(),
})
const validateCitySchema = (city)=> citySchema.validate(city);


const isBusinessSchema = Joi.object({
  isBusiness: Joi.boolean().required(),
})
const validateIsBusinessSchema = (isBusiness) => isBusinessSchema.validate(isBusiness);

const validateSchema = {
  first : validateFirstSchema,
  last: validateLastSchema,
  phone: validatePhoneSchema,
  email: validateEmailLogin,
  password : validatePasswordLogin,
  url : validateUrlSchema,
  alt: validateAltSchema,
  state : validateStateSchema,
  country: validateCountrySchema,
  city: validateCitySchema,
  isBusiness : validateIsBusinessSchema,
}

export default validateSchema;