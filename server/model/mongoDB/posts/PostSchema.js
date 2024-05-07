import mongoose from "mongoose";
import Image from "../users/Image.js";
import Address from "../users/Address.js";
import { emailRegex, phoneRegex, webRegex } from "../../../utils/Regex/Regex.js"
import { DEFAULT_REQUIRED_STRING_VALIDATION } from "../helper/defaultStringValidation.helper.js";

const PostSchema = new mongoose.Schema({
  title: DEFAULT_REQUIRED_STRING_VALIDATION,
  subtitle: DEFAULT_REQUIRED_STRING_VALIDATION,
  description: {
    ...DEFAULT_REQUIRED_STRING_VALIDATION,
    maxLength: 1024,
  },
  image: Image,
  bizNumber: {
    type: Number,
    minLength: 7,
    maxLength: 7,
    required: true,
  },
  likes: [String],
  createAt: {
    type:  Date,
    default: Date.now,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
  },
  creatorName: {
    type: String,
    required: true,
  },
});

const Post = mongoose.model("Post" , PostSchema)

export default Post;