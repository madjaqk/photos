// Controller

var mongoose = require("mongoose")
var Photo = mongoose.model("Photo")

// Rather than the immediate function, it might be better to do this as a constructor function or just an object literal, but that's not how I've done it thus far.
module.exports = (function(){
	return {
		index: function(req, res){
			Photo.find({}).populate("_uploader").exec(function(err, results){
				if(err){
					res.json(err)
				} else {
					res.json(results)
				}
			})
		},

		create: function(req, res){
			// console.log(req.body)
			// console.log(req.body)
			// console.log(req.file)
			pic = new Photo(req.body)
			pic.save(function(err){
				if(err){
					console.log("photo save error", err)
					res.json(err)
				} else {
					res.json({"status": "OK"})
				}
			})
		},

		upload: function(req, res){
			// req.file should be file, req.body text fields
			pic = new Photo(req.body)
			console.log(req.file)
			console.log(req.file.path)
			pic.photo_url = req.file.path
			pic.save(function(err){
				if(err){
					console.log("photo upload error", err)
					res.json(err)
				} else {
					res.json({"status": "OK"})
				}
			})
		},

		add_like: function(req, res){
			Photo.update({ _id: req.body.photo_id}, {"$addToSet": { "_likers": req.body.user_id }}, function(err){
				if(err){
					console.log("add_like error")
					res.json(err)
				} else {
					res.json({"status": "OK"})
				}
			})
		},

		remove_like: function(req, res){
			Photo.update({_id: req.body.photo_id}, {"$pullAll": { "_likers": [req.body.user_id] } }, function(err){
				if(err){
					console.log("remove_like error", err)
					res.json(err)
				} else { 
					res.json({"status": "OK"})
				}
			})
		}
	}
})()