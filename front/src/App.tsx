import { ToastContainer } from "react-toastify";
import { useState } from "react";
import Routes from "./Routes";
import LoaderContext from "./contexts/LoaderContext";
import Loader from "./components/loader/Loader";
import 'bootstrap/dist/css/bootstrap.css';
import 'react-toastify/dist/ReactToastify.css';
import './App.scss';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  
  return (
    <>
      <LoaderContext.Provider value={{ isLoading, setIsLoading }}>
        <Loader />
        <Routes />
        <ToastContainer />
      </LoaderContext.Provider>
    </>
  );
}

export default App;
