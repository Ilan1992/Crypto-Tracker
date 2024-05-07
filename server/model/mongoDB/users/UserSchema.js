import mongoose from "mongoose";
import Name from "./Name.js";
import Address from "./Address.js";
import Image from "./Image.js";
import { phoneRegex, emailRegex } from "../../../utils/Regex/Regex.js";

const UserSchema = new mongoose.Schema({
  name: Name,
  phone: {
    type: String,
    required: true,
    match: RegExp(phoneRegex),
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    match: RegExp(emailRegex),
  },
  password: {
    type: String,
    required: true,
  },
  image: Image,
  address: Address,
  isBusiness: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  FavoriteCoins: {
    type: Array,
  },
});
const User = mongoose.model("user", UserSchema);

export default User;
