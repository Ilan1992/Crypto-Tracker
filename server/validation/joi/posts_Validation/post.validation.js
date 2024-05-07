import Joi from "joi";

const createPostSchema = Joi.object({
  title: Joi.string().min(2).max(256).required(),
  subtitle: Joi.string().min(2).max(256).required(),
  description: Joi.string().min(2).max(1024).required(),
  image: Joi.object().keys({
    url: Joi.string().uri({ scheme: ["http", "https"] }),
    alt: Joi.string().min(2).max(256).allow(""),
  }).required(),
  
});

const createPostSchemaValidation = (postInput) => {
  return createPostSchema.validateAsync(postInput);
};
export default createPostSchemaValidation;
