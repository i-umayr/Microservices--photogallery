import React, { useState, useEffect } from "react";
import styles from "./ExistingImages.module.css";
import axios, { AxiosError } from "axios";
import { useRef } from "react";
import { useAuthUser } from "react-auth-kit";

const ExistingImages = ({ images,onImageDeleted }) => {
  const [fullScreenImage, setFullScreenImage] = useState(null);
  const [optionsPosition, setOptionsPosition] = useState({ top: 0, left: 0 });
  const [showOptions, setShowOptions] = useState(null);
  const auth = useAuthUser();


  useEffect(()=>{
    console.log(images)
  },[])
  const toggleOptions = (event, image) => {
    const rect = event.target.getBoundingClientRect();
    setOptionsPosition({
      top: rect.bottom + window.scrollY + 5,
      left: rect.left + window.scrollX,
    });
    if (showOptions) {
      setShowOptions(null);
    } else {
      setShowOptions(image);
    }
  };
  const openFullScreen = (image) => {
    setFullScreenImage(image);
  };

  const closeFullScreen = () => {
    setFullScreenImage(null);
  };

  const handleView = (image) => {
    setShowOptions(null);
    openFullScreen(image);
  };

  const handleDownload = async (imageLink, imageName) => {
    setShowOptions(null);
    try {
      const response = await fetch(imageLink);
      const blob = await response.blob();

      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", imageName);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (error) {
      console.error("Download failed:", error.message);
    }
  };

  const handleDelete = async (image) => {
    setShowOptions(null);
    try {
      const userId = auth().userId;
      const token = auth().token;
      const config = {
        headers: {
          Authorization: `${token}`,
          "Content-Type": "multipart/form-data",
        },
      };
      const response = await axios.delete(
        `http://localhost:4002/images/${userId}/${image._id}`,
        config
      );
      onImageDeleted(response.data)
    } catch (error) {
      console.error("Error Deleting image:", error);
    }
  };
  return (
    <div className={styles.imageGrid}>
      {images.map((image, index) => (
        <div className={styles.imageCard} key={index}>
          <div className={styles.cardHeader}>
            <p className={styles.imageTitle}>{image.title}</p>
          </div>
          <div className={styles.cardBody}>
            <img
              src={image.imageLink}
              className={styles.fullScreenTrigger}
              onClick={() => openFullScreen(image)}
            />
          </div>
          <div className={styles.cardFooter}>
            <p className={styles.imageSize}>{Math.ceil(image.size)} KB</p>
            <div
              className={styles.optionsButton}
              onClick={(event) => toggleOptions(event, image)}
            >
              ...
            </div>

            {showOptions && (
              <div
                className={styles.options}
                style={{ top: optionsPosition.top, left: optionsPosition.left }}
                key={`options_${index}`}
              >
                <div
                  className={styles.option}
                  onClick={() => handleView(showOptions)}
                >
                  View
                </div>
                <div
                  className={styles.option}
                  onClick={() =>
                    handleDownload(showOptions.imageLink, showOptions.title)
                  }
                >
                  Download
                </div>
                <div
                  className={styles.option}
                  onClick={() => handleDelete(showOptions)}
                >
                  Delete
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
      {fullScreenImage && (
        <>
          <div className={styles.fullScreenOverlay} onClick={closeFullScreen}>
            <img
              src={fullScreenImage.imageLink}
              alt={fullScreenImage.title}
              className={styles.fullScreenImage}
              onClick={(e) => e.stopPropagation()}
            />
            <span className={styles.closeButton} onClick={closeFullScreen}>
              &#10005;
            </span>
          </div>
        </>
      )}
    </div>
  );
};

export default ExistingImages;
