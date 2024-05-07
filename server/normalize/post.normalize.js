import generateUniqueNumber from "../utils/generateUniqueNumber.js";
import { getUserById } from "../model/usersAdapter.js";

const normalizePosts = async (posts) => {
  try {
    let image = {
      url: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
      alt: "Business post image",
    };
    if (posts.image && posts.image.url) {
      image.url = posts.image.url;
    }
    if (posts.image && posts.image.alt) {
      image.alt = posts.image.alt;
    }

    const creatorName = await getCreatorName(posts.user_id); // Implement getCreatorName function
    if (creatorName) {
      posts.creatorName = creatorName;
    }
    
    return {
      ...posts,
      image,
      bizNumber: posts.bizNumber || (await generateUniqueNumber()),
    };
  } catch (err) {
    return Promise.reject(err);
  }
};
const getCreatorName = async (userId) => {
  // Assuming you have a function to fetch user by ID
  const user = await getUserById(userId);
  if (user) {
    return user.name.first; // Assuming name is stored as an object with first and last properties
  }
  return null;
};

export default normalizePosts;
