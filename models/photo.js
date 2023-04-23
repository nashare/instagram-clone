const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-type-url');

const photoSchema = new Schema({
    title: { type: String, required: true},
    url: { type: String, required: true},
    like: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
    }],
    authorId: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
    }],
    authorName: {
        type: String,
    }, 
}, {
    timestamps: true
});


module.exports = mongoose.model('Photo', photoSchema);