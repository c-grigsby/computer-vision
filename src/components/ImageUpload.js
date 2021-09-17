import { Fragment, React, useEffect, useRef, useState } from 'react';

import ImageAnalysis from './AzureCognitiveServices/ImageAnalysis';

const ImageUpload = () => {
  const [fileUploaded, setFileUploaded] = useState();
  const [preview, setPreview] = useState();
  const [imageAnalysis, setImageAnalysis] = useState();
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

  const uploadRequest = (e) => {
    e.preventDefault();
    fileInputRef.current.click();
  };

  const fileSelectedHandler = (e) => {
    console.log(e.target.files[0]);
    // const file = URL.createObjectURL(e.target.files[0]);
    const file = e.target.files[0];
    if (file && file.type.substr(0, 5) === 'image') {
      setFileUploaded(file);
    }
  };

  const imageAnalysisHandler = () => {
    setImageAnalysis(fileUploaded);
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
      <ImageAnalysis image={imageAnalysis} />
    </Fragment>
  );
};

export default ImageUpload;
