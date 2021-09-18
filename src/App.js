// @packages
import { Provider } from 'react-redux';
import { React } from 'react';
// @scripts
import './styles/App.css';
import ImageUpload from './components/ImageUpload/ImageUpload';
import logo from './logo.svg';
import store from './store/store';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1> Azure Cognitive Services </h1>
          <p>
            This application utilizes Machine Learning via Optical Character
            Recognition (OCR) <br />
            to process the text content from any image
          </p>
          <ImageUpload />
        </div>
      </div>
    </Provider>
  );
}

export default App;
