import {Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";


const NavLinkComp = ({to , children}) => {
  return (
    <NavLink
      to={to}
      
      style={{
        textDecoration: "none",
        // marginTop:"14px"
      }}
    >
      {({ isActive }) => (
        <Typography
          color={isActive ? "text.headerActive" : "text.headerColor"}
          sx={{ p: 2 }}
          variant="body1"
          style={{
            fontFamily: "Lorn",
            fontWeight:700,
            border: 2,
            borderStyle: "solid",
            borderColor: "black",
            borderRadius: 30,
            marginLeft: 5,
            marginTop: 5,
            color: "black",
            backdropFilter: "blur(4px)",
            backgroundColor: "rgba(255,255,255,0.3)",
          }}
        >
          {children}
        </Typography>
      )}
    </NavLink>
  );
};
NavLinkComp.propTypes = {
  to: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default NavLinkComp