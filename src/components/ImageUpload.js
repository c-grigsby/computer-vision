// @packages
import Axios from 'axios';
import { BeatLoader } from 'react-spinners';
import { Fragment, React, useEffect, useRef, useState } from 'react';
// @scripts
import classes from './ImageUpload.module.css';
import ImageAnalysis from './AzureCognitiveServices/ImageAnalysis';

const ImageUpload = () => {
  const [fileUploaded, setFileUploaded] = useState();
  const [fileURL, setFileURL] = useState();
  const [loading, setLoading] = useState(false);
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

    setLoading(true);
    await Axios.post(
      'https://api.cloudinary.com/v1_1/foxtrot-9/image/upload',
      formData
    ).then((response) => {
      console.log(response);
      if (response.status === 200) {
        setFileURL(response.data.url);
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
      {fileURL && <ImageAnalysis fileURL={fileURL} filePreview={preview} />}
      {loading && (
        <div className={classes.spinnerDiv}>
          <BeatLoader color="white" loading={loading} size={23} />
        </div>
      )}
    </Fragment>
  );
};

export default ImageUpload;
