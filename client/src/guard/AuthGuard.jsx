import { useContext } from "react";
import { Navigate } from "react-router-dom";
import LoginContext from "../store/loginContext";
import ROUTES from "../routes/ROUTES";
import PropType from "prop-types";

const AuthGuard = ({ children }) => {
  const { login } = useContext(LoginContext);
  if (login) {
    return children;
  } else {
    return <Navigate to={ROUTES.LOGIN} />;
  }
};
AuthGuard.propTypes = {
  children: PropType.node.isRequired
};
export default AuthGuard;
