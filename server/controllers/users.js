// Controller

var mongoose = require("mongoose")
var User = mongoose.model("User")

// Rather than the immediate function, it might be better to do this as a constructor function or just an object literal, but that's not how I've done it thus far.
module.exports = (function(){
	return {
		index: function(req, res){
			User.find({}, function(err, results){
				if(err){
					res.json(err)
				} else {
					res.json(results)
				}
			})
		},

		create: function(req, res){
			User.findOne({name: req.body.name}, function(err, results){
				if(err){
					console.log("users.create findOne error", err)
					res.json(err)
					return
				} else {
					if(results){
						res.json(results)
					} else {
						guy = new User({name: req.body.name})
						guy.save(function(err){
							if(err){
								console.log("new user save error", err)
								res.json(err)
							} else {
								res.json(guy)
							}
						})
					}
				}
			})
		},
	}
})()