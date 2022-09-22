import { lazy } from "react";
import { Routes as React_Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home/Home";
import Footer from "./components/footer/Footer";
const Login = lazy(() => import("./pages/Login/Login"));

const Routes = () => {
  return (
    <>
      <React_Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="*" element={<Navigate to="/" />} />
      </React_Routes>
      <Footer />
    </>
  );
};

export default Routes;