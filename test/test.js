var expect = require('chai').expect
var jsonsheet  =require('../jsonsheet')


describe('assign key chain', function(){
	it('one key', function(){
		var obj = {}
		var kc = ['type']
		var value = "fight"
		jsonsheet.assignKeyChain(obj, kc ,value)
		expect(obj).to.be.deep.equal({type: 'fight'})
	})
	it('keys', function(){
		var obj = {}
		var kc = ['type','subtype','basetype']
		var value = "fight"
		jsonsheet.assignKeyChain(obj, kc ,value)
		expect(obj).to.be.deep.equal({type: {subtype: {basetype: 'fight'}}})
	})
})

describe('title 2 keychain', function () {
	it('1 title', function(){
		var array = [
			['id','duration'],
			['','start','end'],
			[1,'09:00','18:00'],
			[2,'10:00', "19:00"]
		]
		var data =  {s:{c:1, r:1}, e:{c:3, r:1}}

		var keychain = jsonsheet.title2KeyChains(array, data)
		expect(keychain).to.be.deep.equal([['id'],['duration'],['duration']])
	})
	it('2 titles', function(){
		var array = [
			['id','duration'],
			['','start','end'],
			[1,'09:00','18:00'],
			[2,'10:00', "19:00"]
		]
		var data =  {s:{c:1, r:1}, e:{c:3, r:2}}

		var keychain = jsonsheet.title2KeyChains(array, data)
		console.log(JSON.stringify(keychain))
		expect(keychain).to.be.deep.equal([
			['id'],
			['duration','start'],
			['duration','end']])
	})
	it('3 titles', function(){
		var array = [
			['id'	,'duration'	,		,		,'name'],
			[''		,'start'	,'end'			],
			[		,			,'end1'	,'end2'	],
			[1,'09:00','18:00'],
			[2,'10:00', "19:00"]
		]
		var data =  {s:{c:1, r:1}, e:{c:5, r:3}}

		var keychain = jsonsheet.title2KeyChains(array, data)
		console.log(JSON.stringify(keychain))
		expect(keychain).to.be.deep.equal([
			['id'],
			['duration','start'],
			['duration','end','end1'],
			['duration','end','end2'],
			['name']])
	})
})


describe("findBeforeKey", function(){
	it('findBeforeKey', function () {
		var array = [
			['id'	,'duration'	,		,		,'name'],
			[''		,'start'	,'end'			],
			[		,			,'end1'	,'end2'	],
			[1,'09:00','18:00'],
			[2,'10:00', "19:00"]
		]
		var data =  {s:{c:1, r:1}, e:{c:5, r:3}}
		var beforeKey = jsonsheet.findBeforeKey(array, data, {c:4,r:2})
		expect(beforeKey).to.be.equal('end')
	})
	it('findBeforeKey and C', function () {
		var array = [
			['id'	,'duration'	,		,		,'name'],
			[''		,'start'	,'end'			],
			[		,			,'end1'	,'end2'	],
			[1,'09:00','18:00'],
			[2,'10:00', "19:00"]
		]
		var data =  {s:{c:1, r:1}, e:{c:5, r:3}}
		var before = jsonsheet.findBeforeKey(array, data, {c:4,r:2}, true)
		expect(before.key).to.be.equal('end')
		expect(before.c).to.be.equal(3)
	})
	it('findBeforeKey and C2', function () {
		var array = [
			['id'	,'duration'	,		,		,'name'],
			[''		,'start'	,'end'			],
			[		,			,'end1'	,'end2'	],
			[1,'09:00','18:00'],
			[2,'10:00', "19:00"]
		]
		var data =  {s:{c:1, r:1}, e:{c:5, r:3}}
		var before = jsonsheet.findBeforeKey(array, data, {c:4,r:1}, true)
		expect(before.key).to.be.equal('duration')
		expect(before.c).to.be.equal(2)
	})
})


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

	it('one line title ,one line data3', function(){
		var array = [['id','name'],[1,'yang'],[2,'qiang']]
		var data = {s:{c:2, r:1}, e:{c:2, r:3}}
		var json = jsonsheet.array2Json(array, data,1)
		console.log(json)
		expect(json).to.be.deep.equal([
			{name:'yang'},{name:'qiang'}])
	})
	it('one line title ,one line data4', function(){
		var array = [['id','name'],[1,'yang'],[2,'qiang']]
		var data = {s:{c:2, r:1}, e:{c:2, r:2}}
		var json = jsonsheet.array2Json(array, data,1)
		console.log(json)
		expect(json).to.be.deep.equal([
			{name:'yang'}])
	})
	
	it('2 line titles ,2 line data', function(){
		var array = [
			['id','duration'],
			['','start','end'],
			[1,'09:00','18:00'],
			[2,'10:00', "19:00"]
		]
		var data = {s:{c:1, r:1}, e:{c:3, r:4}}
		var json = jsonsheet.array2Json(array, data,2)
		console.log(json)
		expect(json).to.be.deep.equal([
			{id:1, duration:{start: '09:00', end: '18:00'}},
			{id:2, duration:{start: '10:00', end: '19:00'}},	
		])
	})
	
})



















