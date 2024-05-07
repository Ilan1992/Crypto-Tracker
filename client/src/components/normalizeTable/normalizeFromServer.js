const normalizeFromServer = (dataFromServer) => {
  return {
    first: dataFromServer.name.first,
    last: dataFromServer.name.last,
    phone: dataFromServer.phone,
    email: dataFromServer.email,
    url: dataFromServer.image.url,
    alt: dataFromServer.image.alt,
    state: dataFromServer.address.state,
    country: dataFromServer.address.country,
    city: dataFromServer.address.city,
    FavoriteCoins: dataFromServer.FavoriteCoins,
  };
};

export default normalizeFromServer;
