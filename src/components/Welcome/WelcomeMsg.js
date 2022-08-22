// @packages
import { Fragment, React } from 'react';
// @scripts
import logo from '../../public/logo.svg';
import classes from './WelcomeMsg.module.css';

const WelcomeMsg = () => {
  return (
    <Fragment>
      <img src={logo} className="App-logo" alt="logo" />
      <h1 className={classes.welcome_header}>Computer Vision</h1>
      <p className={classes.welcome_text}>
        This application utilizes machine learning via Optical Character
        Recognition (OCR) <br/>
        to analyze the text content found within any image
      </p>
    </Fragment>
  );
};

export default WelcomeMsg;
