import { getPostById } from "../model/postsAdapter.js";
import handleError from "../utils/handleError.js";

const isBizMiddleware = async (req, res, next) => {
  if (!req.userData) {
    throw new Error("Post not found");
  }
  const postObject = await getPostById(req.params.id);
  if (
    (postObject && req.userData._id !== postObject?.user_id.toString()) ||
    !req.userData.isBusiness
  ) {
    return handleError(res, 401, "You are not allowed");
  }
  next();
};
export default isBizMiddleware;
