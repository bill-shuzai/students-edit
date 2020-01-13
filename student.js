var path="./db.json"
var fs=require('fs')

exports.find=function(callback){
	fs.readFile(path, 'utf8', function(err,data) {
		if (err) {
			return callback(err)
		}
		callback(null,JSON.parse(data).students)
	})
}

exports.findById=function(id,callback){
	fs.readFile(path, 'utf8', function(err,data) {
		if (err) {
			return callback(err)
		}
		var students=JSON.parse(data).students
		var student=students.find(function(item){
			return item.id === parseInt(id)
		})

		callback(null,student)
	})
}

exports.save=function(student,callback){
	fs.readFile(path,'utf8',function(err,data){
		if (err) {
			return callback(err)
		}
		var students=JSON.parse(data).students

		student.id=students[students.length-1].id+1

		students.push(student)

		var fileData=JSON.stringify({
			students:students
		})

		fs.writeFile(path,fileData,function(err){
			if (err) {
				return callback(err)
			}

			callback(null)
		})
	})
}

exports.update=function(student,callback){
	fs.readFile(path,'utf8',function(err,data){
		if (err) {
			return callback(err)
		}

		var students=JSON.parse(data).students

		student.id=parseInt(student.id)

		var stu=students.find(function(item){
			return item.id===student.id
		})

		for(var key in student){
			stu[key]=student[key]
		}
		var fileData=JSON.stringify({
			students:students
		})

		fs.writeFile(path,fileData,function(err){
			if (err) {
				return callback(err)
			}

			callback(null)
		})

	})
}

exports.delete=function(id,callback){
	fs.readFile(path,'utf8',function(err,data){
		if (err) {
			return callback(err)
		}

		var students=JSON.parse(data).students

		var index=students.findIndex(function(item){
			return item.id===id
		})

		students.splice(index,1)

		var fileData=JSON.stringify({
			students:students
		})

		fs.writeFile(path,fileData,function(err){
			if (err) {
				return callback(err)
			}
			callback(null)
		})
	})
}


