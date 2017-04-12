const path = require('path');
const fs = require('fs');

const gm = require('gm').subClass({imageMagick: true});
const pdf2img = require('pdf2img');


const convertPDFToPNG = (name_of_the_file, response, callback) => {
	console.log('Converting PDF to PNG');
	let fileName = name_of_the_file;
	var outPutName = fileName.split('.')[0];
	console.log(fileName);
	var pdfPath = path.resolve(__dirname, '..', '..', 'uploads', fileName);
	console.log(fs.existsSync(pdfPath));
	console.log(pdfPath);

	pdf2img.setOptions({
	  type: 'png',                      // png or jpeg, default png 
	  size: 1024,                       // default 1024 
	  density: 600,                     // default 600 
	  outputdir: path.resolve(__dirname, '..', '..', 'uploads') // mandatory, outputdir must be absolute path               
	   // the prefix for the generated files, optional 
	});

	pdf2img.convert(pdfPath, function(err, info) {
	  if (err) console.log(err)
	  else {
	  	console.log(info);
	    typeof callback == "function" ? callback(info) : info;
	  }
  });
}

module.exports = convertPDFToPNG;