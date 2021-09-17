// @packages
import { Fragment, React } from 'react';
// @scripts
import './App.css';
import ImageUpload from './components/ImageUpload.js';
import logo from './logo.svg';

function App() {
  return (
    <Fragment className="App">
      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1> Azure Cognitive Services </h1>
        <p>
          This application utilizes OCR technology from the Azure Read API to
          evaluate the text content of an image
        </p>
        <ImageUpload />
      </div>
    </Fragment>
  );
}

export default App;
