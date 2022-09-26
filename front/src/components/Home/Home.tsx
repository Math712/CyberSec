import React, { useReducer, useEffect } from 'react';
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import Main from '../main/Main';
import './Home.scss';
// import ImageLogo from "../assets/images/logo.png";

const Home = () => {

  return (
    <>
      <Main />
    </>
  );
}

export default Home