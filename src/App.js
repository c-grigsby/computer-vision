// @packages
import { Provider } from 'react-redux';
import { React } from 'react';
// @scripts
import './styles/App.css';
import WelcomeMsg from './components/Welcome/WelcomeMsg';
import ImageUpload from './components/ImageUpload/ImageUpload';
import store from './store/store';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <div className="App-header">
          <WelcomeMsg />
          <ImageUpload />
        </div>
      </div>
    </Provider>
  );
}

export default App;
