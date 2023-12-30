import NewImage from "./NewImage/NewImage";
import { useState,useEffect } from "react";
import ExistingImages from "./ExistingImages/ExistingImages";
import { useSelector, useDispatch } from "react-redux/es/exports";
const Images = () => {
  const [images, setImages] = useState([]);
  const user = useSelector((state) => state.users.userData);

  useEffect(() => {
    if(user.userData.gallery.images[0]){
      setImages(user.userData.gallery.images)
    }
  }, [user]);

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
