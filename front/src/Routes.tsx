import { lazy, useState } from "react";
import { Routes as React_Routes, Route, Navigate } from "react-router-dom";
import Ingredients from "./components/ingredients/Ingredients";
import Modele from "./components/modele/Modele";
import Navbar from "./components/navbar/Navbar";
// import NotFound from "./components/notfound/NotFound";
import Procede from "./components/procede/Procede";
import Home from "./components/Home/Home";
import authService from "./services/authService";
const Login = lazy(() => import("./components/Login/Login"));

const Routes = () => {
  const [isLogged, setIsLogged] = useState(false);

  const updateLogged = (val: boolean) => {
     setIsLogged(val)
  }
  // var isLogged = authService.isLogged()
  
  return (
    <>
      { isLogged && <Navbar setIsLogged={updateLogged}/> }
      <React_Routes>
        { !isLogged && <Route path="/" element={<Login setIsLogged={updateLogged} />} /> }
        { isLogged && <Route path="/home" element={<Home />} /> }
        { isLogged && <Route path="/modele" element={<Modele />} /> }
        { isLogged && <Route path="/procede" element={<Procede />} /> }
        { isLogged && <Route path="/ingredients" element={<Ingredients />} /> }
        <Route path="*" element={<Navigate to="/" />} />
      </React_Routes>
    </>
  );
};

export default Routes;