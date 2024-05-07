import { useState, useEffect } from "react";
import CoinDataContext from "./coinDataContext";
import axios from "axios";
import PropTypes from "prop-types";

const CoinProvider = ({ children }) => {
  const [coinsData, setCoinsData] = useState([]);
  const [filterData, setFilterData] = useState([]);

  useEffect(() => {
    const handleCoinData = async () => {
      try {
        let { data } = await axios.get(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd"
        );
        setCoinsData(data);
      } catch (error) {
        console.log(error);
      }
    };
    handleCoinData();
  },[]);

  useEffect(() => {
    setFilterData([...coinsData]);
  }, [coinsData]);
  
  return (
    <CoinDataContext.Provider value={{ coinsData, filterData, setFilterData }}>
      {children}
    </CoinDataContext.Provider>
  );
};
CoinProvider.propTypes = {
  children: PropTypes.node,
};

export default CoinProvider;
