import express from "express";
import {
  getAllPostsController,
  getPostByIdController,
  getMyPostsController,
  createPostController,
  updatePostController,
  bizNumberController,
  likePostController,
  deletePostController,
} from "../../controllers/posts.controller.js";
import objectIdParamsValidationMiddleware from "../../middlewares/object_id.mw.js";
import authMiddleware from "../../middlewares/auth.mw.js";
import isBizMiddleware from "../../middlewares/isBiz.mw.js";
import bodyValidationMiddleware from "../../middlewares/bodyValidation.mw.js";
import { createPostValidation } from "../../validation/validationAdapter.js";
import adminOrBizMiddleware from "../../middlewares/adminOrBiz.mw.js";
import isAdminMiddleware from "../../middlewares/isAdmin.mw.js";

const router = express.Router();

router.get("/", getAllPostsController);

router.get("/my-posts", authMiddleware, getMyPostsController);

router.get("/:id", objectIdParamsValidationMiddleware, getPostByIdController);

router.post(
  "/",
  authMiddleware,
  isBizMiddleware,
  bodyValidationMiddleware(createPostValidation),
  createPostController
);

router.put(
  "/:id",
  authMiddleware,
  objectIdParamsValidationMiddleware,
  adminOrBizMiddleware,
  bodyValidationMiddleware(createPostValidation),
  updatePostController
);

router.patch(
  "/:id",
  authMiddleware,
  objectIdParamsValidationMiddleware,
  likePostController
);

router.patch(
  "/biz-number/:id",
  authMiddleware,
  objectIdParamsValidationMiddleware,
  isAdminMiddleware,
  bizNumberController
);

router.delete(
  "/:id",
  authMiddleware,
  objectIdParamsValidationMiddleware,
  adminOrBizMiddleware,
  deletePostController
);

export default router;
