import mongoose from "mongoose";
import {
  DEFAULT_STRING_VALIDATION,
  DEFAULT_REQUIRED_STRING_VALIDATION,
} from "../helper/defaultStringValidation.helper.js";

const Address = new mongoose.Schema({
  state: DEFAULT_STRING_VALIDATION,
  country: DEFAULT_REQUIRED_STRING_VALIDATION,
  city: DEFAULT_REQUIRED_STRING_VALIDATION,
  // street: DEFAULT_REQUIRED_STRING_VALIDATION,
  // houseNumber: {
  //   type: Number,
  //   min: 1,
  //   max: 9999999,
  //   required: true,
  // },
  // zip: {
  //   type: Number,
  //   min: 1,
  //   max: 9999999,
  //   required: true,
  // },
});

export default Address;
