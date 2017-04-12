'use strict'

const express = require('express');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors'); 
const fs = require('fs');
const formidable = require('formidable');
var gm = require('gm').subClass({imageMagick: true});
var pdf2img = require('pdf2img');
var request = require('request');
var bodyParser = require('body-parser');
// Convert PDF to PNG
var convertPDFToPNG = require('./backend/convertpdf.js');
// google vision API & parse data
var callToOcrApi = require('./backend/googleocr.js');
// Build a perfect excel for Happytal from the data
const buildAnExcel = require('./backend/buildanexcel.js');
// Build a perfect BIG excel
const bigExcel = require('./backend/bigexcel.js');

const app = express();

// Prob with production and development
if (process.env.NODE_ENV !== 'production') {
  app.use(cors());
}

// Body Parser
app.use(bodyParser.json());

// Setup logger
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));

// Serve static assets
app.use(express.static(path.resolve(__dirname, '..', 'build')));

// For Uploading 
app.post('/api/upload', (req, res) => {
   
  console.log("Receiving the file");
  console.log(path.resolve(__dirname, '..', 'uploads'));
  // create an incoming form object
  var form = new formidable.IncomingForm();
  // specify that we want to allow the user to upload multiple files in a single request
  form.multiples = true;

  // store all uploads in the /uploads directory
  form.uploadDir = path.resolve(__dirname, '..', 'uploads');

  // every time a file has been uploaded successfully,
  // rename it to it's orignal name
  form.on('file', function(field, file) {
    fs.rename(file.path, path.join(form.uploadDir, file.name));
    res.redirect('/api/convert/' + file.name);
  });

    // log any errors that occur
  form.on('error', function(err) {
    console.log('An error has occured: \n' + err);
  });
  
  form.on('progress', function(bytesReceived, bytesExpected) {
        //self.emit('progess', bytesReceived, bytesExpected)

        var percent = (bytesReceived / bytesExpected * 100) | 0;
        console.log('Uploading: %' + percent + '\r');
   }); 

  // parse the incoming request containing the form data
  form.parse(req, (err, fields, files) => {
  	if (err) {  console.log(err); }
  	else {
  		console.log(Object.keys(files)[0]);
  		var theFileName = Object.keys(files)[0];
  	}
  });

  // once all the files have been uploaded, send a response to the client

});

app.get('/api/download/:name', (req, res) => {		
	var fileName = req.params.name.replace('.pdf', '.png');

	res.download(path.resolve(__dirname, '..', 'uploads', fileName), (err, res) => {
		if (err) {
			console.log('Error in the download : ' + err);
		} else {
			console.log('successfully downloaded');
		}
	});
});

// serve files
app.get('/api/send/:name', (req, res) => {
	var fileName = req.params.name;

	res.sendFile(path.resolve(__dirname, '..', 'uploads', fileName));
})

app.get('/api/convert/:name', (req, res) => {

	let file_to_Convert = req.params.name;
	console.log(file_to_Convert);
	// Convert the files - the result is supposed to be an array 
	convertPDFToPNG(file_to_Convert, res, (images) => {
	// Call to Google API AND build and excel thx to the optional callback
	console.log('callback is sent');
	for (let i = 0; i < images.length; i++) {
	console.log(images[i].name);

	callToOcrApi(images[i].name, function(info) {
		bigExcel(info, images[i].name);
	});
	}
	res.redirect('/ocr');
});
  
});

// Call Google Vision API

app.get('/googleapi', (re, res) => {

console.log('starting to ocr');
var filePath = path.resolve(__dirname, '..', 'uploads', 'testocr.png');
// construct parameters
const req = new vision.Request({
  image: new vision.Image(filePath),
  features: [
    new vision.Feature('TEXT_DETECTION', 1)
  ],
  imageContext: {
	        "languageHints": [
	          "fr"
	        ]
	      }
})

	//send single request
	vision.annotate(req).then((err, res) => {
	  // handling response
	var datas = JSON.stringify(res.responses, null, '\t');
	var jsonContent = JSON.parse(content);

	const fullText = jsonContent[0].fullTextAnnotation.text;
	console.log('Text:');
	console.log(fullText);
  	});
});

// Always return the main index.html, so react-router render the route in the client
app.get('*', (req, res) => {
	res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

module.exports = app;


