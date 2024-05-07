
import baseApi from "../services/axiosHelper";
import { jwtDecode } from "jwt-decode";
import { useContext, useEffect, useState } from "react";
import LoginContext from "../store/loginContext";

const useAutoLogin = () => {
  const { setLogin } = useContext(LoginContext);
  const [finishAutoLogin, setFinishAutoLogin] = useState(false);
  let token = localStorage.getItem("token");
  useEffect(() => {
    if (!token) {
      setFinishAutoLogin(true);
      return;
    }
    let userData = jwtDecode(token);
    if (!userData || !userData._id) {
      setFinishAutoLogin(true);
      return;
    }
    const checkUserById = async () => {
      try {
        const res = await baseApi.get("/users/" + userData._id);
        if (res.status === 200) {
          setLogin(userData);
          setFinishAutoLogin(true);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setFinishAutoLogin(true);
      }
    };
    checkUserById();
  }, [token, setLogin]);

  return finishAutoLogin;
};

export default useAutoLogin;
