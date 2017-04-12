'use strict'
const path = require('path')
const fs = require('fs')
var Excel = require('exceljs')

const bigExcel = (data_to_write, fileName, callback) => {

// On enlève le . du png et on récupère que le nom du fichier
var fileName = fileName.split('.')[0];
console.log(fileName);


// On set data_to_write to obj
var obj = data_to_write;

let filename1 = path.resolve(__dirname, '..', '..', 'excels', 'output.xlsx');
let filename2 = filename1;
console.log(filename1);
var sheetName = 'data';


let workbook = new Excel.Workbook();
workbook.xlsx.readFile(filename1)
  .then(() => {


    let rowValues = [];
    rowValues[1] = fileName;
    rowValues[2] = obj.ss;
    rowValues[3] = obj.adherent;
    rowValues[4] = obj.iep;
    rowValues[11] = obj.mutuelle;
    rowValues[12] = obj.date_entre;
    rowValues[13] = obj.date_sortie;
    rowValues[15] = obj.nom;
    rowValues[16] = obj.prenom;
    rowValues[17] = obj.date_naissance;
    rowValues[18] = obj.dmt;

    workbook.getWorksheet(sheetName).addRow(rowValues);
    return workbook.xlsx.writeFile(filename2);
  })
  .then(() => {
    console.log(fileName + ' is written');
    typeof callback == "function" ? callback() : null;
  })
  .catch((err) => { 
      console.log('Erreur in BIGEXCEL ' + fileName);
      console.error(err)}
    );
};

module.exports = bigExcel;