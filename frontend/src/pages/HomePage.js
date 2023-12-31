// import PageContent from "../components/PageContent.js";
import MainNavigation from "../components/MainNavigation/MainNavigation";
// import myImage from "../components/Images/stretched-5120-2880-1324823.jpeg";
// import classes from './HomePage.module.css';

// import myImage from "../../public/images/home.jpg";
import styles from './HomePage.module.css';

import './styles.css';
import Footer from '../components/Footer/Footer'

const HomePage = () => {



  return (
    <>
      <MainNavigation />

      <div className={styles.homepage}>
        <div className="homeContainer">
          <h1 clasName="m-5">Welcome to the gallery</h1>
          <h2 className="mt-3 mb-3">A repository of the past, waiting to be forgotten. But don't we will keep reminding you. Store your memories here. </h2>
          <h2 className="mt-3 mb-3">
          Unlock memories, store freely. Your visual time capsule - where images
          linger and stories await. Limited storage, unlimited tales. Share the
          secret with friends.
        </h2>
        </div>
        <img src={process.env.PUBLIC_URL + '/images/home.jpg'} alt="Home" className={styles.homeImage}/>
      </div>

      <Footer/>
    </>
  );
};

export default HomePage;
