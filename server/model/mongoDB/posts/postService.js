import Post from "./PostSchema.js";

const createPostMongo = (postData) => {
  let post = new Post(postData);
  return post.save();
};

const getAllPostsMongo = () => {
  return Post.find();
};

const getPostByIdMongo = (id) => {
  return Post.findById(id);
};

const getPostByBizNumberMongo = (bizNumber) => {
  return Post.findOne({ bizNumber });
};

const getAllMyPostsMongo = (user_id) => {
  return Post.find({ user_id });
};

const updatePostMongo = (id, postData) => {
  return Post.findByIdAndUpdate(id, postData, { new: true });
};

const deletePostMongo = (id) => {
  return Post.findByIdAndDelete(id);
};
export {
  createPostMongo,
  getAllPostsMongo,
  getPostByIdMongo,
  getPostByBizNumberMongo,
  getAllMyPostsMongo,
  updatePostMongo,
  deletePostMongo,
};
