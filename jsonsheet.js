'use strict'
const XLSX = require('xlsx')
const Utils = XLSX.utils
const s2j = Utils.sheet_to_json
const s2c = Utils.sheet_to_csv
const fileName = 'test.xlsx'

var range = {range: "A3:K30"}

var wb = XLSX.readFile(fileName)

var jsheets = []

for(var k in wb.Sheets){
    jsheets.push({
        name: k,
        data: s2j(wb.Sheets[k], range)
    })
}


const NX = require('node-xlsx')
var nxwb = NX.parse(fileName);
/**
* Json形式的表格.
*/
function JsonSheet(data, sum){
    if((typeof(data) != 'undefined') && (data instanceof array)){
        this.data = data.slice()
    }else{
        this.data = []
    }    
    if((typeof(sum) != 'undefined') && (sum instanceof array)){
        this.sum = sum.slice()
    }else{
        this.sum = []
    }
}

function array2Json(array,  data, titleLineNum, sumLineNum){

}

window.wb = wb
window.XLSX = XLSX
window.Utils = Utils
module.exports = wb

module.exports = JsonSheet