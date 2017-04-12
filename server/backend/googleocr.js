'use strict'
// NE PAS OUBLIER DE METTRE LA VARIABLE D'ENVIRONNEMENT ! 
const dataparser = require('./dataparser.js')
const vision = require('node-cloud-vision-api')
const path = require('path')
const google_auth = process.env.GOOGLE_VISION_AUTH;
vision.init({auth: google_auth})


const callOcrApi = (fileName, callback) => {

var filePath = path.resolve(__dirname, '..', '..', 'uploads', fileName);
// construct parameters
const req = new vision.Request({
  image: new vision.Image(filePath),
  features: [
    new vision.Feature('DOCUMENT_TEXT_DETECTION', 1)
  ],
  imageContext: {
	        "languageHints": [
	          "fr"
	        ]
	      }
})

  // send single request
vision.annotate(req).then((res) => {
  // handling response
  const fullText = res.responses[0].fullTextAnnotation.text;
  // call du parser
  const data_is_parsed = dataparser(fullText);
  // si callback (build an excel ou autres options) on y va sinon on renvoie les data parsed
  typeof callback == "function" ? callback(data_is_parsed) : data_is_parsed;

}, (e) => {
  console.log('Error: ', e)
});

};

module.exports = callOcrApi;