const Photo = require('../models/photo');
const User = require('../models/user');

function newPhoto(req, res) {
    res.render('photos/new', { title: "Download New Photo" });
}

async function create(req, res) {
    try {
        req.body.authorId = req.user._id;
        req.body.authorName = req.user.name;
        await Photo.create(req.body);
        res.redirect('/profile');
    } catch (error) {
        console.log(error);
    }
}

async function like(req, res) {
    try {
        await Photo.updateOne(
            { _id: req.params.id },
            { $push: { like: req.user._id } }
        )
        res.redirect('/');
    } catch (error) {
        console.log(error);
    }
}

async function unlike(req, res) {
    try {
        await Photo.updateOne(
            { _id: req.params.id },
            { $pull: { like: req.user._id } }
        )
        res.redirect('/');
    } catch (error) {
        console.log(error);
    }
}

async function save(req, res) {
    try {
        await User.updateOne(
            { _id: req.user._id },
            { $push: { saved: req.params.id } }
        )
        res.redirect('/');
    } catch (error) {
        console.log(error);
    }
}

async function unsave(req, res) {
    try {
        await User.updateOne(
            { _id: req.user._id },
            { $pull: { saved: req.params.id } }
        )
        res.redirect('/');
    } catch (error) {
        console.log(error);
    }
}

async function deletePhoto(req, res) {
    try {
        await Photo.deleteOne({ _id: req.params.id });
        res.redirect('/');
    } catch (error) {
        console.log(error);
    }
}

async function show(req, res) {
    try {
        const photo = await Photo.findById(req.params.id);
        res.render('photos/show', {title: "Add Comments", photo});
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    new: newPhoto,
    create,
    like,
    unlike,
    delete: deletePhoto,
    save,
    unsave,
    show
};