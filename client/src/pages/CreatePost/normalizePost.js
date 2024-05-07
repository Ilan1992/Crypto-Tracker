const normalizePost = (post) => {
  return{
    title : post.title,
    subtitle: post.subtitle,
    description: post.description,
    image:{
      url: post.url,
      alt: post.alt
    }
  }
}
export default normalizePost;