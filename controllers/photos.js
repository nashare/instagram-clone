const Photo = require('../models/photo');

function newPhoto(req, res) {
    res.render('photos/new', { title: "Download New Photo" });
}

async function create(req, res) {
    try {
        console.log(req.user._id);
        req.body.authorId = req.user._id;
        req.body.authorName = req.user.name;
        await Photo.create(req.body);
        res.redirect('/profile');
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    new: newPhoto,
    create,
};