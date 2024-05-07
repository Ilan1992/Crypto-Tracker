import Joi from "joi";

const titleSchema = Joi.object({
  title: Joi.string().min(2).max(256).required(),
});
const validateTitleSchema = (title) => titleSchema.validate(title);

const subtitleSchema = Joi.object({
  subtitle: Joi.string().min(2).max(256).required(),
});
const validateSubtitleSchema = (subtitle) => subtitleSchema.validate(subtitle);

const descriptionSchema = Joi.object({
  description: Joi.string().min(2).max(1024).required(),
});
const validateDescriptionSchema = (description) =>
  descriptionSchema.validate(description);

const urlSchema = Joi.object({
  url: Joi.string().min(14).required(),
});
const validateUrlSchema = (url) => urlSchema.validate(url);

const altSchema = Joi.object({
  alt: Joi.string().min(2).max(256).required(),
});
const validateAltSchema = (alt) => altSchema.validate(alt);

const postValidateSchema = {
  title: validateTitleSchema,
  subtitle: validateSubtitleSchema,
  description: validateDescriptionSchema,
  url: validateUrlSchema,
  alt: validateAltSchema,
};
export default postValidateSchema;