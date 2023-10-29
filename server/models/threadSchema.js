let mongoose = require('mongoose');
let Schema = mongoose.Schema;

var threadSchema = new Schema({
    title: { type: String, require: true },
    category: { type: Schema.Types.ObjectId, ref: 'category', require: true }
});

exports.Thread = mongoose.model('threads', threadSchema);
