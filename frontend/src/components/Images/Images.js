import NewImage from "./NewImage/NewImage";
import { useAuthUser } from "react-auth-kit";
import { useState,useEffect } from "react";
import axios, { AxiosError } from "axios";
import ExistingImages from "./ExistingImages/ExistingImages";
import ImagesHero from "./ImageHero/ImagesHero";
import Footer from "../Footer/Footer";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Images = () => {
  const [images, setImages] = useState([]);
  const [storage, setStorage] = useState()
  const [bandwidth, setBandwidth] = useState()
  const auth = useAuthUser();
  useEffect(() => {
    const fetchImages = async () => {
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
          `http://localhost:4002/images/${userId}`,config
        );
        console.log(response.data);
        // console.log(response.data.gallery.freeStorage);
        // console.log(response.data.gallery.freeBandwidth);
    
        setStorage(response.data.gallery.freeStorage)
        setBandwidth(response.data.gallery.freeBandwidth)
          setImages(response.data.gallery.images); 
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, [images]);

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
