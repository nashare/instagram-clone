const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-type-url');


const commentSchema = new Schema({
    authorId: {type: Schema.Types.ObjectId,
    ref: 'User'},
    text: String,
    authorName: {type: String},
})


const photoSchema = new Schema({
    title: { type: String, required: true},
    url: { type: mongoose.SchemaTypes.Url, required: true},
    like: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
    }],
    authorId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    authorName: { type: String },
    comments: [commentSchema],
}, {
    timestamps: true
});


module.exports = mongoose.model('Photo', photoSchema);