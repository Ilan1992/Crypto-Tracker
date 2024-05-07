import LayoutComp from "./layout/LayoutComp";
import Router from "./routes/Router";
import LoginContext from "./store/loginContext";
import { useState } from "react";
import { ToastContainer } from "react-toastify";


function App() {
  const [login, setLogin] = useState();

  return (
    <LoginContext.Provider value={{ login, setLogin }}>
      <ToastContainer />
      <LayoutComp>
        <Router />
      </LayoutComp>
    </LoginContext.Provider>
  );
}

export default App;
