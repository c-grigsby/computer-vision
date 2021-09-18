// @packages
import { Fragment, React } from 'react';
// @scripts
import classes from './ImageAnalysis.module.css';
// @declared
const async = require('async');
const ComputerVisionClient =
  require('@azure/cognitiveservices-computervision').ComputerVisionClient;
const ApiKeyCredentials = require('@azure/ms-rest-js').ApiKeyCredentials;

const ImageAnalysis = ({ fileURL, filePreview }) => {
  console.log(fileURL);
  console.log(filePreview);

  // Authentication for Azure Cognitive Services
  const key = process.env.REACT_APP_AZURE_KEY;
  const endpoint = process.env.REACT_APP_AZURE_ENDPOINT;
  const computerVisionClient = new ComputerVisionClient(
    new ApiKeyCredentials({ inHeader: { 'Ocp-Apim-Subscription-Key': key } }),
    endpoint
  );

  function computerVision() {
    async.series([
      async function () {
        const STATUS_SUCCEEDED = 'succeeded';
        const STATUS_FAILED = 'failed';

        const uploadedFileURL = fileURL;

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
        while (true) {
          const readOpResult = await computerVisionClient
            .getReadResult(operationIdUrl)
            .then((result) => {
              return result;
            });

          console.log('Read status: ' + readOpResult.status);

          if (readOpResult.status === STATUS_FAILED) {
            console.log('The Read File operation has failed.');
            break;
          }
          if (readOpResult.status === STATUS_SUCCEEDED) {
            console.log('The Read File operation was a success.');
            console.log('Read File URL image result:');

            // Print the text captured
            for (const textRecResult of readOpResult.analyzeResult
              .readResults) {
              for (const line of textRecResult.lines) {
                console.log(line.text);
              }
            }
            break;
          }
          await new Promise((r) => setTimeout(r, 2000));
        }
      },
    ]);
  }
  computerVision();

  return (
    <Fragment>
      {filePreview ? (
        <img className={classes.img} src={filePreview} alt="analysis" />
      ) : (
        ''
      )}
    </Fragment>
  );
};

export default ImageAnalysis;
