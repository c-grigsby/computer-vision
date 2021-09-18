// @packages
import Axios from 'axios';
import { Fragment, React, useEffect, useRef, useState } from 'react';
// @scripts
import ImageAnalysis from './AzureCognitiveServices/ImageAnalysis';

const ImageUpload = () => {
  const [fileUploaded, setFileUploaded] = useState();
  const [fileURL, setFileURL] = useState();
  const [preview, setPreview] = useState();
  const fileInputRef = useRef();

  useEffect(() => {
    if (fileUploaded) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(fileUploaded);
    } else {
      setPreview(null);
    }
  }, [fileUploaded]);

  const fileSelectedHandler = (e) => {
    const file = e.target.files[0];
    if (file && file.type.substr(0, 5) === 'image') {
      setFileUploaded(file);
    }
  };

  const imageAnalysisHandler = (e) => {
    e.preventDefault();
    uploadToCloud(fileUploaded);
  };

  const uploadToCloud = async (imageFile) => {
    console.log('Uploading to Cloudinary...');
    console.log('Cloudinary:', process.env.REACT_APP_CLOUDINARY);
    const formData = new FormData();
    formData.append('file', imageFile);
    formData.append('upload_preset', process.env.REACT_APP_CLOUDINARY);

    await Axios.post(
      'https://api.cloudinary.com/v1_1/foxtrot-9/image/upload',
      formData
    ).then((response) => {
      console.log(response);
      if (response.status === 200) {
        console.log(response.data.url);
        setFileURL(response.data.url);
      }
    });
  };

  const uploadRequest = (e) => {
    e.preventDefault();
    fileInputRef.current.click();
  };

  return (
    <Fragment>
      <form>
        <button onClick={uploadRequest}>Upload Image</button>
        <input
          accept="image/*"
          type="file"
          style={{ display: 'none' }}
          ref={fileInputRef}
          onChange={fileSelectedHandler}
        />
        {preview && (
          <img src={preview} alt="preview" style={{ objectFit: 'cover' }} />
        )}
        {preview && (
          <button onClick={imageAnalysisHandler}>Image Analysis</button>
        )}
      </form>
      {fileURL && <ImageAnalysis fileURL={fileURL} filePreview={preview} />}
    </Fragment>
  );
};

export default ImageUpload;
