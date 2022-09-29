import React, { useState, useReducer, useEffect } from 'react';
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import { NavItem, navItems } from './NavItems';
import './Navbar.scss';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import authService from '../../services/authService';
import { useDispatch } from 'react-redux';
import { loggedIn } from '../../actions/User';
import Cookies from 'js-cookie';

const Navbar = () => {
  const [openNav, setOpenNav] = useState(false);

  const dispatchGlobal: any = useDispatch();

  const navigate = useNavigate();

  const buttonHandler = (event: React.MouseEvent<HTMLAnchorElement>, item: NavItem ) => {
    event?.preventDefault()
    if (item.id === 4) {
      authService.logout();
      dispatchGlobal(loggedIn(false)).then(navigate('/'));
      Cookies.remove("access_token")
    } else {
      navigate(item.link)
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