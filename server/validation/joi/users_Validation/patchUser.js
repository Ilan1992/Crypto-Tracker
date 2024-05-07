import Joi from "joi";

const patchUserSchema = Joi.object({
  isBusiness: Joi.boolean().required(),
});

const patchUserSchemaValidation = (userInput) => {
  return patchUserSchema.validateAsync(userInput);
};

export default patchUserSchemaValidation;
