<div align="center" markdown="1">

<img src="public/logo192.png" alt="React" width="150"/>

# Azure Cognitive Services

[![npm version](https://badge.fury.io/js/react.svg)](https://badge.fury.io/js/react) [![Netlify Status](https://api.netlify.com/api/v1/badges/be64e88a-89c5-45b3-94fd-5724f7741a0e/deploy-status)](https://app.netlify.com/sites/awesome-cray-160ef7/deploys)

</div>

This application utilizes Machine Learning via Optical Character Recognition [OCR]() to analyze the text content found within any image. It accomplishes this task via the the Computer Vision API, an AI service that analyzes content in images and video. [Live Demo of Application](https://azure-cognitive-services.netlify.app/)

<br/><br/>

<div align="center" markdown="1">

<img src="https://nanonets.com/blog/content/images/2019/08/ocr-in-the-wild.gif" alt="OCR" width="200">

</div>

---

## Project Specifications

- Developed with [React](https://github.com/facebook/create-react-app)
- Utilizes the [Read API](https://docs.microsoft.com/en-us/azure/cognitive-services/computer-vision/overview-ocr#read-api) from Azure Cognitive Services
- Images uploaded to [Cloudinary](https://cloudinary.com/) to provide a URL for processing
- Displays the text extracted from the image to the user
- [Read 3.2 REST API](https://docs.microsoft.com/en-us/azure/cognitive-services/computer-vision/overview-ocr#read-api) Documentation

---

##### This applications utilizes a **.env file** to host environment variables. For utilization configure the following account information:

- ###### REACT_APP_AZURE_KEY
- ###### REACT_APP_AZURE_ENDPOINT
- ###### REACT_APP_CLOUDINARY

---

## Scripts

In the project directory, to install dependencies you can run:

```
npm install
```

Then, to run in development mode

```
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

To build the app for production to the `build` folder.

```
 npm run build
```
