import { lazy } from "react";
import { Routes as React_Routes, Route, Navigate } from "react-router-dom";
import Ingredients from "./components/ingredients/Ingredients";
import Modele from "./components/modele/Modele";
import Procede from "./components/procede/Procede";
import Home from "./pages/Home/Home";
const Login = lazy(() => import("./pages/Login/Login"));

const Routes = () => {
  return (
    <>
      <React_Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/modele" element={<Modele />} />
        <Route path="/procede" element={<Procede />} />
        <Route path="/ingredients" element={<Ingredients />} />
        <Route path="*" element={<Navigate to="/" />} />
      </React_Routes>
    </>
  );
};

export default Routes;