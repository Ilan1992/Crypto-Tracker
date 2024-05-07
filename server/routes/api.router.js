import express from "express";
import usersRouter from "./api/users.router.js";
import postsRouter from "./api/posts.router.js";
import handleError from "../utils/handleError.js";

const router = express.Router();

router.use("/users", usersRouter);

router.use("/posts", postsRouter)

router.use((req , res) =>{
  handleError(res , 404, "Page Not Found")
})

export default router;