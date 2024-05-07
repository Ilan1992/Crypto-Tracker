import { getPostByBizNumber } from "../model/postsAdapter.js";

function getRandomIntInclusive(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
}

const generateUniqueNumber = async () => {
  try {
    let randomNumber;
    let post = {};
    let i = 0;
    const stopNumber = 29999997;
    while (post && i < stopNumber) {
      randomNumber = getRandomIntInclusive(1000000, 9999999);
      post = await getPostByBizNumber(randomNumber);
      i++;
    }
    if (i >= stopNumber) {
      throw new Error("random number not found");
    }
    return randomNumber;
  } catch (err) {
    return Promise.reject(err);
  }
};

export default generateUniqueNumber;
