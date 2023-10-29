var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    username: { type: String, unique: true },
    password: { type: String },
    joinDate: { type: Date },
    isAdmin: { type: Boolean, require: true, default: false},
    posts: [{ type: Schema.Types.ObjectId, ref: 'posts' }]
});

exports.User = mongoose.model('user', userSchema);
