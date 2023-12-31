import NewImage from "./NewImage/NewImage";
import { useState,useEffect } from "react";
import ExistingImages from "./ExistingImages/ExistingImages";
import ImagesHero from "./ImageHero/ImagesHero";
import Footer from "../Footer/Footer";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector, useDispatch } from "react-redux/es/exports";

const Images = () => {
  const [images, setImages] = useState([]);
  const [storage, setStorage] = useState()
  const [bandwidth, setBandwidth] = useState()
  const user = useSelector((state) => state.users.userData);
  useEffect(() => {
    if(user.userData.gallery.images[0]){
      setImages(user.userData.gallery.images)
    }
    if(user.userData.storage){
      setStorage(user.userData.storage.FreeStorage)
    }
    if(user.userData.usage){
    setBandwidth(25000-user.userData.usage.bandwidthDailyUsage)
    }
  }, [user]);

  const imageAddedHandler = (data) => {
    console.log(data)
    setImages(data.gallery.images);
    toast.success('Image added successfully!');
  };
  const imageDeletedHandler=(data)=>{
    console.log(data)
    setImages(data.gallery.images);
    toast.error('Image deleted successfully!');
  }

  return (
    <>
      <ImagesHero storage={storage} bandwidth={bandwidth} />
      <NewImage onImageAdded={imageAddedHandler}/>
      <ExistingImages images={images} onImageDeleted={imageDeletedHandler}/>
      <Footer/>

    </>
  );
};

export default Images;
