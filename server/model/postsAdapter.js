import {
  createPostMongo,
  getAllPostsMongo,
  getPostByIdMongo,
  getPostByBizNumberMongo,
  getAllMyPostsMongo,
  updatePostMongo,
  deletePostMongo,
} from "./mongoDB/posts/postService.js";
import normalizePosts from "../normalize/post.normalize.js";

const DB = "mongo";

const createPost = async (post) => {
  post = await normalizePosts(post);
  if (DB === "mongo") {
    return createPostMongo(post);
  }
};

const getPostByBizNumber = (bizNumber) => {
  if (DB === "mongo") {
    return getPostByBizNumberMongo(bizNumber);
  }
};

const getAllPosts = () => {
  if (DB === "mongo") {
    return getAllPostsMongo();
  }
};

const getPostById = (id) => {
  if (DB === "mongo") {
    return getPostByIdMongo(id);
  }
};

const getAllMyPosts = (user_id) => {
  if (DB === "mongo") {
    return getAllMyPostsMongo(user_id);
  }
};

const updatePost = (id, post) => {
  if (DB === "mongo") {
    return updatePostMongo(id, post);
  }
};

const deletePost = (id) => {
  if (DB === "mongo") {
    return deletePostMongo(id);
  }
};

export {
  createPost,
  getPostByBizNumber,
  getAllPosts,
  getPostById,
  getAllMyPosts,
  updatePost,
  deletePost,
};