import { Container } from "@mui/material";
import PropTypes from "prop-types"

const MainComp = ({ children }) => {
  return <Container>{children}</Container>;
};
MainComp.propTypes = {
  children: PropTypes.node.isRequired
}

export default MainComp;
