import registerSchemaValidation from "./joi/users_Validation/register.js";
import loginSchemaValidation from "./joi/users_Validation/login.js";
import editUserSchemaValidation from "./joi/users_Validation/editUser.js";
import validateObjectIdSchema from "./joi/object_id.js";
import createPostSchemaValidation from "./joi/posts_Validation/post.validation.js";
import bizNumberSchemaValidation from "./joi/posts_Validation/bizNumber.validation.js";

const VALIDATION = "joi";

const registerValidation = (userInput) => {
  if (VALIDATION === "joi") {
    return registerSchemaValidation(userInput);
  } else {
    throw new Error(`Validation ${VALIDATION} is not supported`);
  }
};

const loginValidation = (userInput) => {
  if (VALIDATION === "joi") {
    return loginSchemaValidation(userInput);
  } else {
    throw new Error(`Validation ${VALIDATION} is not supported`);
  }
};

const editUserValidation = (userInput) => {
  if (VALIDATION === "joi") {
    return editUserSchemaValidation(userInput);
  } else {
    throw new Error(`Validation ${VALIDATION} is not supported`);
  }
};

const objectIdValidation = (id) => {
  if (VALIDATION === "joi") {
    return validateObjectIdSchema(id);
  } else {
    throw new Error(`Validation ${VALIDATION} is not supported`);
  }
};

const createPostValidation = (userInput) => {
  if (VALIDATION === "joi") {
    return createPostSchemaValidation(userInput);
  } else {
    throw new Error(`Validation ${VALIDATION} is not supported`);
  }
};

const bizNumberValidation = (bizNumberInput) => {
  if (VALIDATION === "joi") {
    return bizNumberSchemaValidation(bizNumberInput);
  } else {
    throw new Error(`Validation ${VALIDATION} is not supported`);
  }
};

export {
  registerValidation,
  loginValidation,
  editUserValidation,
  objectIdValidation,
  createPostValidation,
  bizNumberValidation,
};
