import { lazy, useState } from "react";
import { Routes as React_Routes, Route, Navigate } from "react-router-dom";
import Ingredients from "./components/ingredients/Ingredients";
import Modele from "./components/modele/Modele";
import Navbar from "./components/navbar/Navbar";
// import NotFound from "./components/notfound/NotFound";
import Procede from "./components/procede/Procede";
import Home from "./components/Home/Home";
// import authService from "./services/authService";
import { useSelector } from "react-redux"
import NotFound from "./components/notfound/NotFound";
const Login = lazy(() => import("./components/Login/Login"));

const Routes = () => {
  const user: any = useSelector((state: any) => state.user);
  const isLogin = user.isLogin;

  return (
    <>
      { isLogin && <Navbar /> }
      <React_Routes>
        { !isLogin && <Route path="/" element={<Login />} /> }
        { isLogin && <Route path="/home" element={<Home />} /> }
        { isLogin && <Route path="/modele" element={<Modele />} /> }
        { isLogin && <Route path="/procede" element={<Procede />} /> }
        { isLogin && <Route path="/ingredients" element={<Ingredients />} /> }
        { isLogin && <Route path="*" element={<NotFound />} /> }
        { !isLogin && <Route path="*" element={<Login />} /> }
      </React_Routes>
    </>
  );
};

export default Routes;