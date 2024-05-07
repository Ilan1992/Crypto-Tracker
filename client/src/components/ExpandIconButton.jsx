import PropTypes from "prop-types";
import { IconButton ,styled} from "@mui/material";


const ExpandIconButton = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

ExpandIconButton.propTypes = {
  onClick: PropTypes.func,
  expanded: PropTypes.bool,
  onSecondaryClick: PropTypes.func,
};

export default ExpandIconButton;
