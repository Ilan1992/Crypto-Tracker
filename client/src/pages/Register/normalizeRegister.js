const normalizeRegister = (data) => {
  return {
    name: {
      first: data.first,
      last: data.last,
    },
    phone: data.phone,
    email: data.email,
    password: data.password,
    image: {
      url: data.url,
      alt: data.alt,
    },
    address: {
      state: data.state,
      country: data.country,
      city: data.city,
    },
    isBusiness: data.isBusiness,
  };
};

export default normalizeRegister;
