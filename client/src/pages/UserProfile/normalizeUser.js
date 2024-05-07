const normalizeUser = (data) => {
  return {
    name: {
      first: data.first,
      last: data.last,
    },
    phone: data.phone,
    email: data.email,
    image: {
      url: data.url,
      alt: data.alt,
    },
    address: {
      state: data.state,
      country: data.country,
      city: data.city,
    },
    FavoriteCoins: data.FavoriteCoins,
  };
};
export default normalizeUser;
