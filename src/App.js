// @packages
import { React } from 'react';
// @scripts
import './App.css';
import ImageUpload from './components/ImageUpload.js';
import logo from './logo.svg';

function App() {
  return (
    <div className="App">
      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1> Azure Cognitive Services </h1>
        <p>
          This application utilizes Machine Learning via Optical Character
          Recognition [OCR] <br />
          to process the text content from any image
        </p>
        <ImageUpload />
      </div>
    </div>
  );
}

export default App;
