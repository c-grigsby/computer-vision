// @packages
import { animateScroll as scroll } from 'react-scroll';
import { BeatLoader } from 'react-spinners';
import { useSelector } from 'react-redux';
import { Fragment, React, useEffect, useState } from 'react';
// @scripts
import classes from './ImageAnalysis.module.css';
import Card from '../UI/Card';
// @declared
const async = require('async');
const ComputerVisionClient =
  require('@azure/cognitiveservices-computervision').ComputerVisionClient;
const ApiKeyCredentials = require('@azure/ms-rest-js').ApiKeyCredentials;

const ImageAnalysis = ({ imageURL, filePreview }) => {
  const selectingImage = useSelector((state) => state.selectingImage);

  const [loading, setLoading] = useState(true);
  const [imageAnalysis, setImageAnalysis] = useState();
  const [results, setResults] = useState(false);

  useEffect(() => {
    // Authentication for Azure Cognitive Services
    const key = process.env.REACT_APP_AZURE_KEY;
    const endpoint = process.env.REACT_APP_AZURE_ENDPOINT;
    const computerVisionClient = new ComputerVisionClient(
      new ApiKeyCredentials({
        inHeader: { 'Ocp-Apim-Subscription-Key': key },
      }),
      endpoint
    );
    let analysisResults = [];

    function computerVision() {
      async.series([
        async function () {
          const STATUS_SUCCEEDED = 'succeeded';
          const STATUS_FAILED = 'failed';
          const uploadedFileURL = imageURL;

          // API call returns a ReadResponse, grab operation location (ID) from response
          const operationLocationUrl = await computerVisionClient
            .read(uploadedFileURL)
            .then((response) => {
              return response.operationLocation;
            });
          const operationIdUrl = operationLocationUrl.substring(
            operationLocationUrl.lastIndexOf('/') + 1
          );

          // Wait for the read operation to finish, use operationId to get result
          let waitingOnAPI = true;
          while (waitingOnAPI) {
            const readOpResult = await computerVisionClient
              .getReadResult(operationIdUrl)
              .then((result) => {
                return result;
              });
            console.log('Read status: ' + readOpResult.status);

            if (readOpResult.status === STATUS_FAILED) {
              setLoading(false);
              analysisResults.push('The Read File operation has failed');
              setImageAnalysis(analysisResults);
              waitingOnAPI = false;
              setResults(true);
              return;
            }
            if (readOpResult.status === STATUS_SUCCEEDED) {
              analysisResults.push('The Read File operation was a success');

              // Store & Display the text captured
              console.log(readOpResult.analyzeResult);
              for (const textRecResult of readOpResult.analyzeResult
                .readResults) {
                for (const line of textRecResult.lines) {
                  analysisResults.push(line.text);
                }
              }
              if (analysisResults.length < 3) {
                analysisResults.push('No Text Discovered in Image Analysis');
              }
              setLoading(false);
              setImageAnalysis(analysisResults);
              waitingOnAPI = false;
              setResults(true);
              scroll.scrollToBottom({
                smooth: true,
                offset: 100,
              });
              return;
            }
            await new Promise((r) => setTimeout(r, 1000));
          }
        },
      ]);
    }
    computerVision();
  }, [imageURL]);

  return (
    <Fragment>
      <img className={classes.img} src={filePreview} alt='analysis' />
      <BeatLoader color='white' loading={loading} size={23} />
      {results && !selectingImage ? (
        <Card className={classes.Card}>
          {imageAnalysis.map((word, index) => {
            return index === 0 ? (
              <p key={`${word}_${index}`} className={classes.textHeader}>
                {word}
              </p>
            ) : (
              <div key={word} className={classes.text}>
                {word}
              </div>
            );
          })}
        </Card>
      ) : (
        ''
      )}
    </Fragment>
  );
};

export default ImageAnalysis;
