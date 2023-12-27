// import PageContent from "../components/PageContent.js";
import MainNavigation from "../components/MainNavigation/MainNavigation";
// import myImage from "../components/Images/stretched-5120-2880-1324823.jpeg";
// import classes from './HomePage.module.css';
import './styles.css';




const HomePage = () => {
  return (
    <>
      <MainNavigation />

      {/* <div>
        <div class="grid grid-flow-row sm:grid-flow-col md:grid-rows-1 sm:grid-cols-2 gap-8 py-6 sm:py-16" style={{opacity: 1, transform: 'none'}}>
          <div class="flex flex-col justify-center items-start row-start-2 sm:row-start-1">
            <h1 class="text-3xl lg:text-4xl xl:text-5xl font-medium text-black leading-normal">Welcome to our Cloud-Centric 
            </h1>

            <div class="mt-2 font-semibold text-pri-500">Photo Gallery Application</div>

            <p class="text-black mt-4 mb-6">Explore, upload, and manage your photos seamlessly in our microservices-based cloud-centric solution.
            </p>
            <a class="py-3 lg:py-4 px-12 lg:px-16 text-white hover:scale-105 font-semibold rounded-lg bg-pri-600 hover:shadow-orange-md transition-all outline-none " href="/">Start Exploring</a>
          </div>
          
          <div class="flex w-full">
            <div class="h-full w-full" style={{opacity: 1, transform: 'none'}}>
              <img width="612" height="383" class="lg:ml-12" style={{color:'transparent'}} src={myImage} alt="My Image"/>
            </div>
          </div>
        </div>
      </div> */}

      <div className="homePage">
        <div className="homeContainer">
          <h1>Welcome to my gallery</h1>
          <h2>This is where I kept all of my photo collection.</h2>
          <img src='../components/Images/stretched-5120-2880-1324823.jpeg' alt="camera" className="homePic" />
          <a
            href=""
            className="homePicDesc"
          >
            cartoon-clipart png from pngtree.com
          </a>
        </div>
      </div>


    </>
  );
};

export default HomePage;
