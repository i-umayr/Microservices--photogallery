// MainNavigation.jsx
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import classes from "./MainNavigation.module.css";
import { useSignOut } from "react-auth-kit";
import { useNavigate } from "react-router-dom";
import { useIsAuthenticated } from "react-auth-kit";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaUserPlus, FaSignInAlt } from 'react-icons/fa';
import { AiFillHome, AiFillPicture } from 'react-icons/ai';
import { FaSignOutAlt } from 'react-icons/fa';


const MainNavigation = () => {

  const logoImg = `${process.env.PUBLIC_URL}/images/icon.png`;

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
<<<<<<< HEAD
            <NavLink to="/" className={`${classes.logo}`}>
              Photolicious
=======
            <NavLink to="/" className={` ${classes.logo}`}>
              <img src={logoImg} alt="logo img" />PhotoPhilic
>>>>>>> 6964a13e26ea234f2dd5070d5ec855b3a9405f94
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
                <NavLink 
                  to="/" 
                  className="nav-link" 
                  end
                  style={({ isActive }) => ({
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    borderRadius: '10px',
                    boxShadow: isActive ? '0 3px 0px rgba(31, 38, 135)' : 'none'
                  })}
                >
                  <AiFillHome
                    style={({ isActive }) => ({
                      fontSize: '2rem',
                      marginRight: '4px',
                    })}
                  /> Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink 
                  to="/images" 
                  className="nav-link" 
                  end
                  style={({ isActive }) => ({
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    borderRadius: '10px',
                    boxShadow: isActive ? '0 3px 0px rgba(31, 38, 135)' : 'none'
                  })}
                >
                  <AiFillPicture
                    style={({ isActive }) => ({
                      fontSize: '2rem',
                      marginRight: '4px'
                    })}
                  /> Images
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
                    <NavLink to="login" className={classes.btn} end>
                      <FaSignInAlt /> Login
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="register" className={classes.btn} end>
                      <FaUserPlus /> Register
                    </NavLink>
                  </li>
                </>
              ) : (
                <li className="nav-item">
                  <button className={classes.btn} onClick={LogoutHandler}>
                  <FaSignOutAlt /> Logout
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
