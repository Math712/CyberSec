import React, { useState, useReducer, useEffect } from 'react';
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import { NavItem, navItems } from './NavItems';
import './Navbar.scss';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import authService from '../../services/authService';

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

const Navbar = ({setIsLogged}: any) => {
  const [openNav, setOpenNav] = useState(false)
  const [state, dispatch] = useReducer(reducer, initialState);

  const navigate = useNavigate();

  useEffect(() => {
    
  }, [state]);

  const handleAction = () => {
    dispatch({
      type: 'action',
      payload: ""
    });
  };

  const buttonHandler = (event: React.MouseEvent<HTMLAnchorElement>, item: NavItem ) => {
    event?.preventDefault()
    if (item.id === 4 ) {
      authService.logout()
      setIsLogged(false)
      navigate('/');
    }
  };

  const toggleOpen = () => {
    setOpenNav(!openNav)
  }

  return (
    <>
      <div className={openNav ? "sidenav" : "sidenavClosed"}>
          <div>
            <button className="menuBtn" onClick={toggleOpen}>
                    {openNav ? <KeyboardDoubleArrowLeftIcon /> : <KeyboardDoubleArrowRightIcon /> }
            </button>
          </div>
          {navItems.map(item =>{
              return <NavLink key={item.id} className="sideitem" to={item.link} onClick={(e) => buttonHandler(e, item)}>
                        {item.icon}
                        <span className={openNav?"linkText":"linkTextClosed"}>{item.text}</span>
                     </NavLink>
           })}
      </div>
    </>
  );
}

export default Navbar