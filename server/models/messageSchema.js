var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var messageSchema = new Schema({
    title: { type: String, require: true },
    message: { type: String, require: true },
    readStatus: { type: Boolean, default: false },
    sender: {type: Schema.Types.ObjectId, ref: 'user',  require: true},
    receiver: { type: Schema.Types.ObjectId, ref: 'user',  require: true},
    sendDate: { type: Date}
});

exports.Message = mongoose.model('Message', messageSchema);
