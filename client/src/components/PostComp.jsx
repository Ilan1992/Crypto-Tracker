import { useContext, useState } from "react";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Collapse,
  IconButton,
  Avatar,
  Typography,
  Box,
} from "@mui/material/";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ImgError from "../assets/images/logo-Crypto-Tracker.png";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeIcon from "@mui/icons-material/Mode";
import LoginContext from "../store/loginContext";
import PropTypes from "prop-types";
import useCompare from "../hooks/useCompare";
import moment from "moment";
import Share from "./share/Share";
import ExpandIconButton from "./ExpandIconButton";

const PostComp = ({
  img,
  title,
  description,
  subtitle,
  onLike,
  id,
  liked,
  onEdit,
  onDelete,
  createAt,
  creatorName,
  user_id,
}) => {
  const { login } = useContext(LoginContext);
  const [isLiking, setIsLiking] = useState(liked || false);
  const [expanded, setExpanded] = useState(false);

  const { inputsValues } = useCompare();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const handleImagError = (e) => {
    e.target.src = ImgError;
  };
  const handleEditClick = () => {
    onEdit(id);
  };
  const handleLikeClick = () => {
    onLike(id);
    setIsLiking((prevIsLiking) => !prevIsLiking);
  };
  const handleDeleteClick = () => {
    onDelete(id);
  };
  const loggedInIcons = [
    {
      onClick: handleLikeClick,
      children: (
        <FavoriteIcon color={liked || isLiking ? "error" : "inherit"} />
      ),
    },
  ];
  const logBizIcons = [
    {
      onClick: handleEditClick,
      children: <ModeIcon />,
    },
    {
      onClick: handleDeleteClick,
      children: <DeleteIcon />,
    },
  ];
  return (
    <Card
      sx={{ maxWidth: 645, width: { md: "40vw", xs: "100%" } }}
      elevation={12}
    >
      <CardHeader
        avatar={
          <Avatar aria-label="recipe">
            <img src={inputsValues.url} alt={inputsValues.alt} width={50} />
          </Avatar>
        }
        title={`Post By : ${creatorName}`}
        subheader={moment(createAt).format("DD/MM/YYYY")}
      />
      <Typography variant="h6" textAlign={"center"} color="gray.500">
        {title}
      </Typography>

      <CardMedia
        component="img"
        image={img || ImgError}
        onError={handleImagError}
        alt="image"
        height={200}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {subtitle}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Box>
          {login &&
            loggedInIcons.map((item, index) => {
              return (
                <IconButton onClick={item.onClick} key={"icon1" + index}>
                  {item.children}
                </IconButton>
              );
            })}
          {login.isBusiness &&
          login._id === user_id &&
            logBizIcons.map((item, index) => {
              return (
                <IconButton onClick={item.onClick} key={"icon2" + index}>
                  {item.children}
                </IconButton>
              );
            })}
          <IconButton aria-label="share">
            <Share description={"this is a basic share page"}/>
          </IconButton>
        </Box>
        <ExpandIconButton
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandIconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>{description}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};
PostComp.propTypes = {
  img: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  onLike: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  liked: PropTypes.bool,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  createAt: PropTypes.string,
  creatorName: PropTypes.string,
  user_id: PropTypes.string,
};


export default PostComp;
