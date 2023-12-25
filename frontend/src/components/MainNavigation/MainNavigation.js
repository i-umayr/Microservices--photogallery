import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import classes from "./MainNavigation.module.css";
import { useSignOut } from "react-auth-kit";
import { useNavigate } from "react-router-dom";
import { useIsAuthenticated } from "react-auth-kit";

const MainNavigation = () => {
  const signOut = useSignOut();
  const navigate = useNavigate();
  const isAuthenticated = useIsAuthenticated();

  const LogoutHandler = () => {
    signOut();
    navigate("/");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light rounded-3 p-3 m-5">
  <div className="container-fluid">
    <div className="collapse navbar-collapse d-flex justify-content-between" id="navbarSupportedContent">
      <ul className="navbar-nav">
        <li className="nav-item">
          <NavLink to="/" className="nav-link" end>
            Home
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/images" className="nav-link" end>
            Images
          </NavLink>
        </li>
      </ul>
      <ul className="navbar-nav">
        {!isAuthenticated() ? (
          <>
            <li className="nav-item mx-3">
              <NavLink to="login" className="btn btn-primary" end>
                Login
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="register" className="btn btn-secondary" end>
                Register
              </NavLink>
            </li>
          </>
        ) : (
          <li className="nav-item">
            <button className="btn btn-secondary" onClick={LogoutHandler}>
              Logout
            </button>
          </li>
        )}
      </ul>
    </div>
  </div>
</nav>

    </>
  );
};

export default MainNavigation;
