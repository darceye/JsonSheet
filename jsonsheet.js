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
/*
找当前key位置前面不为空的Key. 
isReturnC为true的时候, 返回BeforeKey的c位置.
*/
function findBeforeKey(array, data, currentLocation, isReturnC){
    var beforeKey;
    var findC;
    for(findC = currentLocation.c - 1; findC >= data.s.c; findC--){
        beforeKey = array[currentLocation.r - 1][findC - 1]
        if(beforeKey != undefined && beforeKey != ""){
            break;
        }
    }
    if(typeof(isReturnC) != "undefined" && isReturnC){
        return {
            c: findC,
            key: beforeKey
        }
    }else{
        return beforeKey
    }
   
}
// function findKeyOnBeforeKey(array, data, currentLocation){
//     var keyOnBeforeKey;
//     var beforeKey;
//     for(var findC = currentLocation.c - 1; findC >= data.e.c; findC--){
//         beforeKey = array[currentLocation.r - 1][findC - 1]
//         if(beforeKey != undefined){
//             // 
//             if()
//             break;
//         }
//     }

// }
function title2KeyChains(array, data){

    var keyChains = []
    if(array[data.s.r - 1][data.s.c - 1] == undefined){
        console.warn("The first cell is empty, canceled.")
        return []
    }

    /*
    Generate key-chain
    方式: 当前key为空, 上一行也空(第一个key), 则向同一行前面找不为空的作为当前key
    
    方式: 当前key为空, 上一行不为空, 则: 
    需要区分如下的emptyA和emptyB, 
    emptyA向前找到b2, 从b2向上找到b, 从当前位置向上找到start, b != start, 则 emptyA为空.
    emptyB向前找到end, 从end向上找到duration, 从当前位置向上找到duration, 两者相等, 
    则 emptyB为end.

    type            duration        
    a       b       start   end     *emptyB
    a1      b2      *emptyA end1    end2
    */
    for(var c = data.s.c ; c <= data.e.c; c++){
        var keyChain = []
        for(var r = data.s.r; r <= data.e.r; r++){
            var key = array[r - 1 ][c - 1]
            if(key != undefined && key != ""){
                keyChain.push(key)
            }else if(keyChain.length == 0){
                var beforeKey = findBeforeKey(array, data, {c: c, r: r})    
                console.assert(beforeKey != undefined, "Cannot find beforeKey")

                keyChain.push(beforeKey)
            }else{
                // 区分emptyA和emptyB
                var before = findBeforeKey(array, data, {c: c, r: r}, true)

                //向前未找到, 则认为属于EmptyA的情况.
                if(before.key != undefined && before.key != ""){
                    console.assert(r >=2, "不应该是第一行")
                    var onBeforeKey = keyChains[before.c - data.s.c][r - 2]
                    var onThisKey = keyChain[r - 2]

                    if(onBeforeKey == onThisKey){
                        keyChain.push(before.key)
                    }
                }
            }
        }
        keyChains.push(keyChain)
    }
    return keyChains
}

function array2Json(array,  data, titleLineNum, sumLineNum){
    var json = []
    var keyChains = title2KeyChains(array, 
        {
            s:{r: data.s.r, c: data.s.c}, 
            e:{r: data.s.r + titleLineNum - 1, c: data.e.c}
        })

    console.log("keyChains",keyChains)

    for( var r = data.s.r + titleLineNum; r <= data.e.r; r++){
        var onedata = {}
        for(var c = data.s.c ; c <= data.e.c; c++){
            // var key = array[data.s.r - 1][c - 1]
            // onedata[key] = array[r - 1][c - 1]
            assignKeyChain(onedata, keyChains[c - data.s.c ], array[r - 1][c - 1])
        }
        json.push(onedata)
    }
    return json
}

function assignKeyChain(obj, keyChain, value){
    var key = keyChain[0]
    if(keyChain.length === 1){
        obj[key] = value
    } else{
        if(!obj.hasOwnProperty(key)){
            obj[key] = {}

        }
        assignKeyChain(obj[key], keyChain.slice(1), value)
    }
}

window.wb = wb
window.XLSX = XLSX
window.Utils = Utils

module.exports = JsonSheet
var ex = module.exports
ex.array2Json = array2Json

ex.assignKeyChain = assignKeyChain
ex.title2KeyChains = title2KeyChains
ex.findBeforeKey = findBeforeKey