const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-type-url');

const photoSchema = new Schema({
    title: { type: String, required: true},
    url: { type: String, required: true},
    like: [],
    authorId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    authorName: {
        type: String,
    }, 
    saved: [],
}, {
    timestamps: true
});


module.exports = mongoose.model('Photo', photoSchema);