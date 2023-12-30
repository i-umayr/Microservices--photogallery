import { useState, useRef } from 'react';
import { useAuthUser } from 'react-auth-kit'
import { useEffect } from 'react';
import styles from './NewImage.module.css';
import LoadingBar from 'react-top-loading-bar';

import axios, { AxiosError } from "axios";
const NewImage = ({ onImageAdded }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const auth = useAuthUser()
  const fileInputRef = useRef(null);
  const ref = useRef(null);

  useEffect(() => {
    if (selectedFiles.length > 0) {
      // Trigger form submission
      imageUploadHandler({ preventDefault: () => { } });
    }
  }, [selectedFiles]);

  const handleFileChange = (event) => {
    const files = event.target.files;
    setSelectedFiles(files);
  };

  const imageUploadHandler = async (event) => {
    event.preventDefault();
    ref.current.continuousStart();

    const formData = new FormData();
    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append('images', selectedFiles[i]); // This might cause issues
    }

    try {
      const token = auth().token;
      const userId = auth().userId;
      for (let pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }
      const url = `http://localhost:4002/images/add/${userId}`;

      const config = {
        headers: {
          Authorization: `${token}`,
          'Content-Type': 'multipart/form-data',
        },
      };
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      const response = await axios.post(url, formData, config);
      onImageAdded(response.data);
      ref.current.complete();

    } catch (error) {
      console.log(error);
      ref.current.complete();

    }
  };
  return (
    <>
      <LoadingBar color='#FFB700' ref={ref} />
      <form encType="multipart/form-data" onSubmit={imageUploadHandler}>
      <input
        ref={fileInputRef}
        id="file"
        name="file"
        type="file"
        multiple
        onChange={handleFileChange}
        className={styles.fileInput}
      />
      <label htmlFor="file" className={styles.fileLabel}>
        <span className={styles.plusIcon}>+</span>
        <span>Choose files</span>
      </label>
        {/* <button className="btn btn-success" type="submit">
          Submit
        </button> */}
      </form>
    </>
  );
};

export default NewImage;