import { urlRegex } from "../../../utils/Regex/Regex.js"; 

const URL = {
  type: String,
  trim: true,
  match: RegExp(urlRegex),
};

export default URL;
