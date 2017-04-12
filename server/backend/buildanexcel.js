'use strict'
const path = require('path')
const fs = require('fs')
var excelbuilder = require('msexcel-builder')

const buildAnExcel = (data_to_write, fileName, callback) => {

// On enlève le . du png et on récupère que le nom du fichier
var fileName = fileName.split('.')[0];
console.log(fileName);
// Create a new workbook file in current working-path
var workbook = excelbuilder.createWorkbook(path.resolve(__dirname, '..', '..', 'excels'), fileName +'.xlsx');
console.log(path.resolve(__dirname, '..', '..', 'excels', fileName +'.xlsx'));
// On set data_to_write to obj
var obj = data_to_write;
// Create a new worksheet with 10 columns and 12 rows
var sheet = workbook.createSheet('data', 100, 110);

var row = 1;
// Fill some data
sheet.set(1, row, 'Clem');
sheet.set(2, row, obj.ss);
sheet.set(3, row, obj.adherent);
sheet.set(4, row, obj.iep);
sheet.set(11, row, obj.mutuelle);
sheet.set(12, row, obj.date_entre);
sheet.set(13, row, obj.date_sortie);
sheet.set(15, row, obj.nom);
sheet.set(16, row, obj.prenom);
sheet.set(17, row, obj.date_naissance);
sheet.set(18, row, obj.dmt);

  // Save it
  workbook.save(function(err){
    if (err) {
    	console.log('PROBLEME in the WORKBOOK - BUILDANEXCEL function');
    	console.log(err);
    }
    else {
    	console.log('congratulations, your WORBOOK created');
    	typeof callback == "function" ? callback() : null;
    }
  });

};

module.exports = buildAnExcel;