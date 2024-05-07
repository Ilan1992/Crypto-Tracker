import Joi from "joi";

const bizNumberSchema = Joi.object({
  bizNumber: Joi.number().min(1000000).max(9999999).required(),
});

const bizNumberSchemaValidation = (bizNumberInput) => {
  return bizNumberSchema.validateAsync(bizNumberInput);
};

export default bizNumberSchemaValidation;
