const normalizeToServer = (data) => {
  return {
    name: {
      first: data.first,
      last: data.last,
    },
    phone: data.phone,
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
export default normalizeToServer;
