var users = require("./../controllers/users.js")
var photos = require("./../controllers/photos.js")

module.exports = function(app){
	app.get("/url/path/tk", users.index) // No apostrophes after lines
	app.post("/users", users.create)
	app.get("/photos", photos.index)
	app.post("/photos", photos.create)
	app.post("/add_like", photos.add_like)
	app.post("/remove_like", photos.remove_like)
}