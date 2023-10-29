let mongoose = require('mongoose');
let Schema = mongoose.Schema;

// TODO: add date and whatnot
var postSchema = new Schema({
    message: { type: String, require: true },
    poster: { type: Schema.Types.ObjectId, ref: 'user', require: true },
    thread: { type: Schema.Types.ObjectId, ref: 'thread', require: true }
});

exports.Post = mongoose.model('posts', postSchema);
