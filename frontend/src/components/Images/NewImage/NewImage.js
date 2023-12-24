import { useState } from 'react';
import {useAuthUser} from 'react-auth-kit'
import { useEffect } from 'react';
import axios, { AxiosError } from "axios";
const NewImage = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const auth = useAuthUser()

  const handleFileChange = (event) => {
    const files = event.target.files;
    setSelectedFiles(files);
  };

  const imageUploadHandler = async (event) => {
    event.preventDefault();
    
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
  
      const response = await axios.post(url, formData, config);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <form encType="multipart/form-data" onSubmit={imageUploadHandler}>
        <input
          id="file"
          name="file"
          type="file"
          multiple
          onChange={handleFileChange}
        />
        <button className="btn btn-success" type="submit">
          Submit
        </button>
      </form>
    </>
  );
};

export default NewImage;
