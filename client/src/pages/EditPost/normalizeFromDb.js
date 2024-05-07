const normalizeFromDb = (data) => {
return{
  title: data.title,
  subtitle: data.subtitle,
  description: data.description,
  url: data.image.url,
  alt: data.image.alt,
}
}
export default normalizeFromDb;