import express from "express";
import {
  registerUserController,
  loginUserController,
  updateUserController,
  getAllUsersController,
  getUserByIdController,
  patchIsBizController,
  deleteUserController,
  patchIsAdminController,
} from "../../controllers/users.controller.js";
import {
  registerValidation,
  loginValidation,
  editUserValidation,
} from "../../validation/validationAdapter.js";
import bodyValidationMiddleware from "../../middlewares/bodyValidation.mw.js";
import authMiddleware from "../../middlewares/auth.mw.js";
import objectIdParamsValidationMiddleware from "../../middlewares/object_id.mw.js";
import adminOrOwn from "../../middlewares/adminOrOwn.mw.js";
import isAdminMiddleware from "../../middlewares/isAdmin.mw.js";

const router = express.Router();

router.get("/", authMiddleware, isAdminMiddleware, getAllUsersController);

router.get(
  "/:id",
  authMiddleware,
  objectIdParamsValidationMiddleware,
  adminOrOwn,
  getUserByIdController
);

router.post(
  "/register",
  bodyValidationMiddleware(registerValidation),
  registerUserController
);

router.post(
  "/login",
  bodyValidationMiddleware(loginValidation),
  loginUserController
);

router.put(
  "/:id",
  authMiddleware,
  objectIdParamsValidationMiddleware,
  adminOrOwn,
  bodyValidationMiddleware(editUserValidation),
  updateUserController
);

router.patch(
  "/:id",
  authMiddleware,
  objectIdParamsValidationMiddleware,
  adminOrOwn,
  patchIsBizController
);

router.patch(
  "/patch/:id",
  authMiddleware,
  objectIdParamsValidationMiddleware,
  isAdminMiddleware,
  patchIsAdminController
);

router.delete(
  "/:id",
  authMiddleware,
  objectIdParamsValidationMiddleware,
  adminOrOwn,
  deleteUserController
);

export default router;
