var users = require("./../controllers/users.js")
var photos = require("./../controllers/photos.js")

var multer = require("multer")

var storage = multer.diskStorage({
	destination: "./client/static/images",
	filename: function(req, file, cb){
		cb(null, Date.now() + "-" + file.originalname )
	}
})
var upload = multer({ storage: storage })

module.exports = function(app){
	app.get("/url/path/tk", users.index) // No apostrophes after lines
	app.post("/users", users.create)
	app.get("/photos", photos.index)
	app.post("/photos", photos.create)
	app.post("/upload", upload.single("file"), photos.upload)
	app.post("/add_like", photos.add_like)
	app.post("/remove_like", photos.remove_like)
}