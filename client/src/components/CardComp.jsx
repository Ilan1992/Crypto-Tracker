import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  CardActionArea,
  CardMedia,
  Divider,
  IconButton,
  Box,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useNavigate } from "react-router-dom";
import ROUTES from "../routes/ROUTES";
import PropType from "prop-types"

const CardComp = ({
  id,
  market_cap_rank,
  image,
  name,
  symbol,
  current_price,
  price_change_percentage_24h,
  market_cap,
  isFavorited,
  onLike,
}) => {
  const navigate = useNavigate();

  const handleClickCard = (event) => {
    const id = event.currentTarget.id;
    navigate(`${ROUTES.VIEW_COIN}/${id}`);
  };
  
  const handleLikeCoin = () => {
    onLike(id);
  };

  let regex = /\B(?=(\d{3})+(?!\d))/g;

  return (
    <Card raised>
      <CardActionArea id={id} onClick={handleClickCard}>
        <CardMedia component="img" image={image} alt="image" height={200} />
      </CardActionArea>
      <CardHeader
        title={`${name} ${symbol}`}
        subheader={
          <Typography variant="h6" color="initial">
            ${" "}{current_price}
          </Typography>
        }
      />
      <Divider />
      <CardContent sx={{ paddingBottom: "0 !important" }}>
        <Typography>
          <Typography component="span" fontWeight={700}>
            Rank:{" "}
          </Typography>
          {market_cap_rank}
        </Typography>
        <Typography
          sx={{
            color: price_change_percentage_24h > 0 ? "green;" : "red;",
          }}
        >
          <Typography component="span" fontWeight={700}>
            24h%:{" "}
          </Typography>
          {price_change_percentage_24h.toFixed(2)}%
        </Typography>
        <Typography>
          <Typography component="span" fontWeight={700}>
            market Cap:$
          </Typography>
          {market_cap.toFixed().replace(regex, ",")}
        </Typography>
        <Divider />
        {/* <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        > */}
          <Box>
            <IconButton aria-label="" id={id} onClick={handleLikeCoin}>
              <FavoriteIcon color={isFavorited ? "error" : "inherit"} />
            </IconButton>
          </Box>
        {/* </Box> */}
      </CardContent>
    </Card>
  );
};

CardComp.propTypes = {
  id: PropType.string.isRequired,
  market_cap_rank: PropType.number.isRequired,
  market_cap: PropType.number.isRequired,
  image: PropType.string.isRequired,
  name: PropType.string.isRequired,
  symbol: PropType.string.isRequired,
  current_price: PropType.number.isRequired,
  price_change_percentage_24h: PropType.number.isRequired,
  isFavorited: PropType.bool.isRequired,
  onLike: PropType.func,
};

export default CardComp;
