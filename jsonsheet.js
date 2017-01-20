'use strict'
const XLSX = require('xlsx')
const Utils = XLSX.utils
const s2j = Utils.sheet_to_json
const s2c = Utils.sheet_to_csv
const basename = 'test.xlsx'
const path = require('path')

if(typeof(window) == 'undefined'){
    var window = global
}

var dir = path.dirname(__filename)
var filename = path.format({dir: dir, base: basename})
///////////////////
console.log("this: ",  dir, filename)

////////////////////

var range = {range: "A3:K30"}

var wb = XLSX.readFile(filename)

var jsheets = []


for(var k in wb.Sheets){
    jsheets.push({
        name: k,
        data: s2j(wb.Sheets[k], range)
    })
}


const NX = require('node-xlsx')
var nxwb = NX.parse(filename);
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
    var json = []
    for( var r = data.s.r + titleLineNum; r <= data.e.r; r++){
            var onedata = {}
        for(var c = data.s.c ; c <= data.e.c; c++){
            var key = array[data.s.r - 1][c - 1]
            onedata[key] = array[r - 1][c - 1]
        }
        json.push(onedata)
    }
    return json
}

window.wb = wb
window.XLSX = XLSX
window.Utils = Utils

module.exports = JsonSheet
var ex = module.exports
ex.array2Json = array2Json
