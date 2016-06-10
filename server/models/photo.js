// Model

var mongoose = require("mongoose")

var PhotoSchema = new mongoose.Schema(
	{
		photo_url: { 
			type: String, 
			required: true,
		},
		subject: {
			type: String,
		},
		_uploader: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		_likers: [{
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		}]
	},
	{ timestamps: true} // This line is options for the schema, not fields
)

mongoose.model("Photo", PhotoSchema)