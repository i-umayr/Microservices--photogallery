// MainNavigation.jsx
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import classes from "./MainNavigation.module.css";
import { useSignOut } from "react-auth-kit";
import { useNavigate } from "react-router-dom";
import { useIsAuthenticated } from "react-auth-kit";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MainNavigation = () => {
  const signOut = useSignOut();
  const navigate = useNavigate();
  const isAuthenticated = useIsAuthenticated();
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const LogoutHandler = () => {
    toast.success('Logout successful!');
    signOut();
    navigate("/");
  };

  return (
    <>
      <nav className={`${classes.blurredNavbar} navbar navbar-expand-lg p-1`}>
        <div className="container-fluid">
          <div className="d-flex align-items-center">
            <NavLink to="/" className={`${classes.logo}`}>
              Photolicious
            </NavLink>

            <button
              className={`navbar-toggler ${isOpen ? "active" : ""}`}
              type="button"
              onClick={toggleNavbar}
            >
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>

          <div className={`collapse navbar-collapse ${isOpen ? "show" : ""}`}>
            <ul className="navbar-nav mx-auto">
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
              {isAuthenticated() ? 
              <li className="nav-item mx-3">
                <NavLink to="/profile" className="nav-link" end>
                  Profile
                </NavLink>
              </li>:null}
            </ul>
            <ul className="navbar-nav ml-auto">
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
