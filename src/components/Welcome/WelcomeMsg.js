// @packages
import { Fragment, React } from 'react';
// @scripts
import logo from '../../public/logo.svg';

const WelcomeMsg = () => {
  return (
    <Fragment>
      <img src={logo} className="App-logo" alt="logo" />
      <h1>Azure Computer Vision</h1>
      <p>
        This application utilizes Machine Learning via Optical Character
        Recognition (OCR) <br />
        to analyze the text content found within any image
      </p>
    </Fragment>
  );
};

export default WelcomeMsg;
