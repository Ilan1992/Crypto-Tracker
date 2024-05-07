import {
  createPost,
  getAllPosts,
  getPostById,
  getAllMyPosts,
  updatePost,
  deletePost,
} from "../model/postsAdapter.js";
import handleError from "../utils/handleError.js";
import debug from "debug";
let log = debug("app:postsController");

const getAllPostsController = async (req, res) => {
  try {
    let posts = await getAllPosts();
    return res.json(posts);
  } catch (error) {
    log(error);
    handleError(res, 400, error.massage);
  }
};

const getPostByIdController = async (req, res) => {
  try {
    let post = await getPostById(req.params.id);
    return res.json(post);
  } catch (error) {
    log(error);
    handleError(res, 400, error.massage);
  }
};

const getMyPostsController = async (req, res) => {
  const userId = req.userData._id;
  try {
    let myPosts = await getAllMyPosts(userId);
    return res.json(myPosts);
  } catch (error) {
    log(error);
    handleError(res, 400, error.massage);
  }
};

const createPostController = async (req, res) => {
  try {
    const userId = req.userData._id;
    req.body.user_id = userId;
    let newPost = await createPost(req.body);
    return res.json(newPost);
  } catch (error) {
    log(error);
    handleError(res, 400, error.massage);
  }
};

const updatePostController = async (req, res) => {
  try {
    const updatedPost = await updatePost(req.params.id, req.body);
    return res.json(updatedPost);
  } catch (error) {
    log(error);
    handleError(res, 400, err.message);
  }
};

const bizNumberController = async (req, res) => {
  try {
    const postFromDb = await getPostById(req.params.id);
    if (!postFromDb) {
      throw new Error("Post not found");
    }
    let bizNum = req.body.bizNumber;
    let bizNumFromDb = req.userData.bizNumber;
    if (bizNum !== bizNumFromDb) {
      let post = await updatePost(req.params.id, {
        $set: { bizNumber: bizNum },
      });
      return res.json(post);
    }
  } catch (error) {
    log(error);
    handleError(res, 400, err.message);
  }
};

const likePostController = async (req, res) => {
  try {
    const postFromDb = await getPostById(req.params.id);
    if (!postFromDb) {
      throw new Error("Post not found");
    }

    const userId = req.userData._id; 
    const postId = req.params.id;
    let likePost = await getPostById(postId);
    let likeArray = likePost.likes;

    const isLiked = likeArray.includes(userId); // Check if user has already liked the post

    if (isLiked) {
      // Remove user ID if post is already liked
      likeArray = likeArray.filter((id) => id !== userId);
    } else {
      // Add user ID if post is not already liked
      likeArray.push(userId);
    }

    const updatedPost = await updatePost(postId, { likes: likeArray });
    return res.json(updatedPost);
  } catch (error) {
    log(error);
    handleError(res, 400, error.message);
  }
};

const deletePostController = async (req, res) => {
  try {
    const postFromDb = await getPostById(req.params.id);
    if (!postFromDb) {
      throw new Error("Post not found");
    }
    let postToDelete = await deletePost(req.params.id);
    return res.json(postToDelete);
  } catch (error) {
    log(error);
    handleError(res, 400, err.message);
  }
};

export {
  getAllPostsController,
  getPostByIdController,
  getMyPostsController,
  createPostController,
  updatePostController,
  bizNumberController,
  likePostController,
  deletePostController,
};
