var expect = require('chai').expect
var jsonsheet  =require('../jsonsheet')

describe('array 2 json', function(){

	it('one line title ,one line data', function(){
		var array = [['id'],[1]]
		var data = {s:{c:1, r:1}, e:{c:1, r:2}}
		var json = jsonsheet.array2Json(array, data,1)
		console.log(json)
		expect(json).to.be.deep.equal([{id: 1}])
	})

	it('one line title ,one line data2', function(){
		var array = [['id','name'],[1,'yang'],[2,'qiang']]
		var data = {s:{c:1, r:1}, e:{c:2, r:3}}
		var json = jsonsheet.array2Json(array, data,1)
		console.log(json)
		expect(json).to.be.deep.equal([
			{id: 1, name:'yang'},{id:2, name:'qiang'}])
	})

	it('one line title ,one line data2', function(){
		var array = [['id','name'],[1,'yang'],[2,'qiang']]
		var data = {s:{c:2, r:1}, e:{c:2, r:3}}
		var json = jsonsheet.array2Json(array, data,1)
		console.log(json)
		expect(json).to.be.deep.equal([
			{name:'yang'},{name:'qiang'}])
	})
	it('one line title ,one line data2', function(){
		var array = [['id','name'],[1,'yang'],[2,'qiang']]
		var data = {s:{c:2, r:1}, e:{c:2, r:2}}
		var json = jsonsheet.array2Json(array, data,1)
		console.log(json)
		expect(json).to.be.deep.equal([
			{name:'yang'}])
	})
	
	it('one line title ,one line data2', function(){
		var array = [
			['id','duration'],
			['','start','end'],
			[1,'09:00','18:00'],
			[2,'10:00', "19:00"]
		]
		var data = {s:{c:2, r:1}, e:{c:2, r:2}}
		var json = jsonsheet.array2Json(array, data,1)
		console.log(json)
		expect(json).to.be.deep.equal([
			{name:'yang'}])
	})
	
})