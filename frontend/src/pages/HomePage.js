// import PageContent from "../components/PageContent.js";
import MainNavigation from "../components/MainNavigation/MainNavigation";
// import myImage from "../../public/images/home.jpg";
import styles from './HomePage.module.css';
import './styles.css';

const HomePage = () => {
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

    </>
  );
};

export default HomePage;
