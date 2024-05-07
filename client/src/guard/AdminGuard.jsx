import { useContext } from "react";
import { Navigate } from "react-router-dom";
import LoginContext from "../store/loginContext";
import ROUTES from "../routes/ROUTES";
import PropType from "prop-types";

const AdminGuard = ({ children }) => {
  const { login } = useContext(LoginContext);
  if (login.isAdmin) {
    return children;
  } else {
    return <Navigate to={ROUTES.LOGIN} />;
  }
};
AdminGuard.propTypes = {
  children: PropType.node.isRequired,
};
export default AdminGuard;
