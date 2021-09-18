// @packages
import Axios from 'axios';
import { BeatLoader } from 'react-spinners';
import { Fragment, React, useEffect, useRef, useState } from 'react';
// @scripts
import classes from './ImageUpload.module.css';
import ImageAnalysis from '../../components/AzureCognitiveServices/ImageAnalysis';

const ImageUpload = () => {
  const [fileUploaded, setFileUploaded] = useState();
  const [fileURL, setFileURL] = useState();
  const [loading, setLoading] = useState();
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
    uploadToCloud();
  };

  const uploadToCloud = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append('file', fileUploaded);
    formData.append('upload_preset', process.env.REACT_APP_CLOUDINARY);

    await Axios.post(
      'https://api.cloudinary.com/v1_1/foxtrot-9/image/upload',
      formData
    ).then((response) => {
      if (response.status === 200) {
        const imageURL = response.data.url;
        setFileURL(imageURL);
      } else {
        console.log(response);
      }
    });
    setLoading(false);
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
      {fileURL && <ImageAnalysis filePreview={preview} imageURL={fileURL} />}
      <div className={classes.spinnerDiv}>
        <BeatLoader color="white" loading={loading} size={23} />
      </div>
    </Fragment>
  );
};

export default ImageUpload;
