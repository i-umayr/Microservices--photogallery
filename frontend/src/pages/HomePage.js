// import PageContent from "../components/PageContent.js";
import MainNavigation from "../components/MainNavigation/MainNavigation";
// import myImage from "../components/Images/stretched-5120-2880-1324823.jpeg";
// import classes from './HomePage.module.css';

// import myImage from "../../public/images/home.jpg";
import styles from './HomePage.module.css';
import { useAuthUser } from "react-auth-kit";
import { useState,useEffect } from "react";
import axios, { AxiosError } from "axios";
import {useDispatch } from "react-redux/es/exports";
import { useIsAuthenticated } from "react-auth-kit";
import { setUserData } from "../store/slices/UserSlice";

import './styles.css';
import Footer from '../components/Footer/Footer'

const HomePage = () => {
  const isAuthenticated = useIsAuthenticated();
  const auth = useAuthUser();
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = auth().userId;
        const token = auth().token;
        const config = {
            headers: {
              Authorization: `${token}`,
              'Content-Type': 'multipart/form-data',
            },
          };
        const response = await axios.get(
          `http://localhost:4005/queries/${userId}`,config
        );
        const userData = response.data;
        dispatch(setUserData({userData}))
        console.log(userData)
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    if (isAuthenticated()) {
      fetchData(); 
    }
  }, [dispatch]);







  return (
    <>
      <MainNavigation />

      <div className={styles.homepage}>
        <div className="homeContainer">
          <h1>Welcome to the gallery</h1>
          <h2>A repository of the past, waiting to be forgotten. But don't we will keep reminding you. Store your memories here. </h2>
          {/* <img src="../../public/images/home.jpg" alt="camera" className="homePic" /> */}
        </div>
        <img src={process.env.PUBLIC_URL + '/images/home.jpg'} alt="Home" className={styles.homeImage}/>
      </div>

      <Footer/>
    </>
  );
};

export default HomePage;
