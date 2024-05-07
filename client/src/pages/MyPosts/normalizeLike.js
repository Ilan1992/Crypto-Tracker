
const normalizeLike = (posts, myId) => {
  if (!posts) return null;

  const isUserLoggedIn = myId !== undefined;

  const newPosts = posts.map((post) => ({
    ...post,
    liked: isUserLoggedIn ? post.likes.includes(myId) : false,
  }));
  return newPosts;
};
export default normalizeLike;
