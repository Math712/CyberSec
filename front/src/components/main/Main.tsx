import React, { useReducer, useEffect } from 'react';
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import './Main.scss';

type State = {
  
};

const initialState:State = {
  
};

type Action = { type: 'action', payload: string };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    default: 
      return state;
  }
}

const Main = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    
  }, [state]);

  const handleAction = () => {
    dispatch({
      type: 'action',
      payload: ""
    });
  };

  return (
    <>Main</>
  );
}

export default Main