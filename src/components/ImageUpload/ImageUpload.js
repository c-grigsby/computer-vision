// @packages
import { animateScroll as scroll } from 'react-scroll';
import Axios from 'axios';
import { BeatLoader } from 'react-spinners';
import { useSelector, useDispatch } from 'react-redux';
import { Fragment, React, useEffect, useRef, useState } from 'react';
// @scripts
import classes from './ImageUpload.module.css';
import ImageAnalysis from '../../components/AzureCognitiveServices/ImageAnalysis';
import { selectImage } from '../../store/index';

const ImageUpload = () => {
  const selectingImage = useSelector((state) => state.selectingImage);
  const dispatch = useDispatch();

  const [fileUploaded, setFileUploaded] = useState();
  const [fileURL, setFileURL] = useState(null);
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
      if (!selectingImage) dispatch(selectImage());
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
    formData.append('upload_preset', process.env.REACT_APP_CLOUDINARY_KEY);

    await Axios.post(
      `${process.env.REACT_APP_CLOUDINARY_ENDPOINT}`,
      formData
    ).then((response) => {
      if (response.status === 200) {
        const imageURL = response.data.url;
        setFileURL(imageURL);
      } else {
        console.log(response);
      }
    });
    scroll.scrollToBottom({
      smooth: true,
    });
    setLoading(false);
    dispatch(selectImage());
  };

  const uploadRequest = (e) => {
    e.preventDefault();
    fileInputRef.current.click();
  };

  return (
    <Fragment>
      <form className={classes.form}>
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
      {fileURL && !selectingImage ? (
        <ImageAnalysis filePreview={preview} imageURL={fileURL} />
      ) : (
        ''
      )}
      <div className={classes.spinnerDiv}>
        <BeatLoader color="white" loading={loading} size={23} />
      </div>
    </Fragment>
  );
};

export default ImageUpload;
