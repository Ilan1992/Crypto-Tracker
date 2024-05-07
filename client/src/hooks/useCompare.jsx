import { useContext, useEffect, useState } from "react";
import LoginContext from "../store/loginContext";
import CoinDataContext from "../store/coinDataContext";
import normalizeFromServer from "../components/normalizeTable/normalizeFromServer";
import baseApi from "../services/axiosHelper";

const useCompare = () => {
  const { login } = useContext(LoginContext);
  const { coinsData } = useContext(CoinDataContext);
  const [inputsValues, setInputValue] = useState({
    first: "",
    last: "",
    phone: "",
    url: "",
    alt: "",
    state: "",
    country: "",
    city: "",
    FavoriteCoins: [],
  });
  const [coinDataUpdatee, setCoinDataUpdate] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userFromDb = await baseApi.get("/users/" + login._id);
        setInputValue(normalizeFromServer(userFromDb.data));
        const updatedCoinsData = await Promise.all(
          coinsData.map(async (coin) => {
            const isFavorited = await userFromDb.data.FavoriteCoins.includes(
              coin.id
            );
            return { ...coin, isFavorited };
          })
        );
        setCoinDataUpdate(updatedCoinsData); // Set coinDataUpdatee after fetching data
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [login._id, coinsData]);

  // Return the values after they have been set
  return { coinDataUpdatee, inputsValues };
};


export default useCompare;
