import { Grid, Container,Box } from "@mui/material";
import { useEffect, useState, useContext } from "react";
import CardComp from "./CardComp";
import useCompare from "../hooks/useCompare";
import baseApi from "../services/axiosHelper";
import normalizeToServer from "./normalizeTable/normalizeToServer";
import LoginContext from "../store/loginContext";
import CircularProgress from "@mui/material/CircularProgress";


const CardsContainer = () => {
  const { login } = useContext(LoginContext)
  const [isLoading, setIsLoading] = useState(true);
  const [coinDataUpdate ,setCoinDataUpdate ] = useState([])
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
    setIsLoading(false)
    setCoinDataUpdate(coinDataUpdatee);
  }, [coinDataUpdatee]);

  useEffect(() => {
    setInputValue(inputsValues);
  }, [inputsValues]);

const handleLikePost = async (index) =>{
  const clickedCoinId = coinDataUpdate[index].id;
  if (!clickedCoinId) return;

  const updatedCoinsData = [...coinDataUpdate]; // Create a copy
  updatedCoinsData[index].isFavorited = !updatedCoinsData[index].isFavorited; // Toggle isFavorited

  setCoinDataUpdate(updatedCoinsData);
  
  const setIsCoinFavorited = (updateStateFn) => {
    setInputValue({
      ...inputsValue,
      FavoriteCoins: updateStateFn(inputsValue.FavoriteCoins),
    });
  };
  const updateFavorites = (existingFavorites) => {
    return existingFavorites.includes(clickedCoinId)
      ? existingFavorites.filter((id) => id !== clickedCoinId) // remove if exists
      : [...existingFavorites, clickedCoinId]; // add if new
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
}

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 10,
        marginTop: 10,
      }}
    >
      {isLoading && (
        <Box sx={{ width: "50%" ,display:"flex",justifyContent:"center"}}>
          <CircularProgress />
        </Box>
      )}
      <Grid container spacing={2}>
        {coinDataUpdate.map((item, index) => (
          <Grid
            item
            lg={2}
            md={3}
            xs={6}
            key={"Card" + index}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <CardComp
              id={item?.id}
              market_cap_rank={item?.market_cap_rank}
              image={item?.image}
              name={item?.name}
              symbol={item?.symbol}
              current_price={item?.current_price}
              isFavorited={item?.isFavorited}
              onLike={() => handleLikePost(index)}
              price_change_percentage_24h={item?.price_change_percentage_24h}
              market_cap={item?.market_cap}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default CardsContainer;
