import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import classes from "./MainNavigation.module.css";
import { useSignOut } from "react-auth-kit";
import { useNavigate } from "react-router-dom";

const MainNavigation = () => {
  const signOut = useSignOut();
  const navigate = useNavigate();

  
  const LogoutHandler = () => {
    signOut();
    navigate("/login");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light rounded-3 p-3 m-5">
        <div className="collapse navbar-collapse d-flex justify-content-between" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <NavLink
                to="/"
                className={({ isActive }) => (isActive ? `${classes.active} nav-link` : `nav-link`)}
                end
              >
                Home
              </NavLink>
            </li>
            
            
           
            <li className="nav-item mt-0">
              <NavLink
                to=""
                className={({ isActive }) => (isActive ? `${classes.active} nav-link` : `nav-link`)}
                end
              >
                <button className="btn btn-secondary m-0" onClick={LogoutHandler}>Logout</button>
              </NavLink>
            </li>
          </ul>
          
          
        </div>
      </nav>
    </>
  );
};

export default MainNavigation;
