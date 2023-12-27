import NewImage from "./NewImage/NewImage";
import { useAuthUser } from "react-auth-kit";
import { useState,useEffect } from "react";
import axios, { AxiosError } from "axios";
import ExistingImages from "./ExistingImages/ExistingImages";
const Images = () => {
  const [images, setImages] = useState([]);
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
          setImages(response.data.gallery.images); 
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, []);

  const imageAddedHandler = (data) => {
    console.log(data)
    setImages(data.gallery.images);
  };
  const imageDeletedHandler=(data)=>{
    console.log(data)
    setImages(data.gallery.images);
  }
  return (
    <>
      <NewImage onImageAdded={imageAddedHandler}/>
      <ExistingImages images={images} onImageDeleted={imageDeletedHandler}/>
    </>
  );
};

export default Images;
