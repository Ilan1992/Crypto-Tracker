import { useParams } from "react-router-dom";
import CoinDataContext from "../../store/coinDataContext";
import { useContext, useEffect, useState } from "react";
import { Grid, Typography, Box, Button } from "@mui/material";
import Divider from "@mui/material/Divider";
import axios from "axios";
import moment from "moment";
import StarIcon from "@mui/icons-material/Star";
import useCompare from "../../hooks/useCompare";
import normalizeToServer from "../../components/normalizeTable/normalizeToServer";
import baseApi from "../../services/axiosHelper";
import LoginContext from "../../store/loginContext";
import LineChart from "./LineChart";
import RatingStars from "./Rating";

const ViewCoinPage = () => {
  const { id } = useParams();
  const { coinsData } = useContext(CoinDataContext);
  const { login } = useContext(LoginContext);
  const [coinData, setCoinData] = useState();
  const [priceData, setPriceData] = useState([]);
  const [coinDataUpdate, setCoinDataUpdate] = useState([]);
  const [inputsValue, setInputValue] = useState({
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

  const { coinDataUpdatee, inputsValues } = useCompare(); // Destructure the returned values
  
  useEffect(() => {
      setCoinDataUpdate(coinDataUpdatee);
  }, [coinDataUpdatee]);

  useEffect(() => {
    setInputValue(inputsValues);
  }, [inputsValues]);

  useEffect(() => {
    const findDataCoin = async () => {
      const coin = coinDataUpdate?.find((coin) => coin.id === id);
      setCoinData(coin);
    };
    findDataCoin();
  }, [id, coinsData, coinDataUpdate]);

  let regex = /\B(?=(\d{3})+(?!\d))/g;

  useEffect(() => {
    const getPriceData = async () => {
      const options = {
        method: "GET",
        url: `https://api.coingecko.com/api/v3/coins/${id}/market_chart`,
        params: { vs_currency: "usd", days: "365" },
        headers: {
          accept: "application/json",
          "x-cg-demo-api-key": "CG-Rv7Sr8umXdDekPD6GPSRmg1g",
        },
      };
      try {
        const res = await axios.request(options);
        const formattedPriceData = res.data.prices.map((entry) => [
          moment(entry[0]).format("YYYY-MM-DD"), // Convert Date object to string in the desired format
          parseFloat(entry[1]),
        ]);
        setPriceData(formattedPriceData);
      } catch (error) {
        console.log(error);
      }
    };
    getPriceData();
  }, [id]);

  const handleFavCoin = async () => {
    if (!coinData) return;

    const updatedCoinData = { ...coinData }; // Create a copy of the coin object
    updatedCoinData.isFavorited = !updatedCoinData.isFavorited; // Toggle isFavorited

    setCoinData(updatedCoinData); // Update the state with the modified coin object

    const setIsCoinFavorited = (updateStateFn) => {
      setInputValue({
        ...inputsValue,
        FavoriteCoins: updateStateFn(inputsValue.FavoriteCoins),
      });
    };
    const updateFavorites = (existingFavorites) => {
      return existingFavorites.includes(coinData.id)
        ? existingFavorites.filter((id) => id !== coinData.id) // remove if exists
        : [...existingFavorites, coinData.id]; // add if new
    };
    setIsCoinFavorited(updateFavorites);

    // Update server-side
    try {
      const updatedFavoriteCoins = updateFavorites(inputsValue.FavoriteCoins);
      await baseApi.put("/users/" + login._id, {
        ...normalizeToServer(inputsValue),
        FavoriteCoins: updatedFavoriteCoins,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Grid container sx={{ mb: 10, xs: { height: "100%" } }}>
      <Typography
        variant="p"
        color="gray.500"
        sx={{
          my: 3,
          textAlign: "center",
          fontWeight: 500,
          fontFamily: "Lora",
          fontSize: { xs: "1rem", sm: "1rem", md: "1.5rem" },
        }}
      >
        Welcome to our digital currency page! Here you find comprehensive and
        up-to-date information about the selected currency, including current
        price, historical changes, market data, and more. Enjoy your informative
        browsing !
        <Divider>
          <img src={coinData?.image} alt="image of coin" width={50} />
        </Divider>
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography
            variant="h3"
            color="gray.500"
            sx={{ fontFamily: "Lora", fontWeight: 500 }}
          >
            <img src={coinData?.image} alt="image of coin" width={70} />
            {coinData?.name}
          </Typography>{" "}
          <Typography variant="span" color="gray.500">
            {coinData?.symbol.toUpperCase()}
          </Typography>
        </Box>
        <Box
          sx={{ display: "flex", justifyItems: "center", flexDirection: "row" }}
        >
          <Typography variant="h3" color="gray.500">
            $ {coinData?.current_price}{" "}
            <Typography
              variant="span"
              sx={{ fontSize: "1rem" }}
              color={{
                color:
                  coinData?.price_change_percentage_24h > 0 ? "green;" : "red;",
              }}
            >
              {coinData?.price_change_percentage_24h.toFixed(2)} % (1d)
            </Typography>
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          flexDirection: "column",
        }}
      >
        <Typography variant="h6" color="gray.500">
          Market Cap Rank : {coinData?.market_cap_rank}
          <Divider />
        </Typography>
        <Typography variant="h6" color="gray.500">
          Market Cap : $ {coinData?.market_cap.toFixed().replace(regex, ",")}
          <Divider />
        </Typography>
        <Typography variant="h6" color="gray.500">
          Volume (24h) : ${" "}
          {coinData?.total_volume.toFixed().replace(regex, ",")} <Divider />
        </Typography>
        <Typography variant="h6" color="gray.500">
          Circulating Supply :{" "}
          {coinData?.circulating_supply.toFixed().replace(regex, ",")}{" "}
          {coinData?.symbol.toUpperCase()}
          <Divider />
        </Typography>
        <Typography variant="h6" color="gray.500">
          Total supply : {coinData?.total_supply.toFixed().replace(regex, ",")}{" "}
          {coinData?.symbol.toUpperCase()}
          <Divider />
        </Typography>
      </Box>
      <Box sx={{width:'100%'}}>
        <LineChart data={priceData} />
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        <Box>
          <RatingStars />
        </Box>
        <Box>
          <Button variant="contained" onClick={handleFavCoin} color="inherit">
            Add To Watchlist
            <StarIcon color={coinData?.isFavorited ? "error" : "inherit"} />
          </Button>
        </Box>
      </Box>
    </Grid>
  );
};

export default ViewCoinPage;
