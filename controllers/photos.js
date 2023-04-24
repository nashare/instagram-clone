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
        const page = req.body.page;
        await Photo.updateOne(
            { _id: req.params.id },
            { $push: { like: req.user._id } }
        )
        redirectPage(page, res, req);
    } catch (error) {
        console.log(error);
    }
}

async function unlike(req, res) {
    try {
        const page = req.body.page;
        await Photo.updateOne(
            { _id: req.params.id },
            { $pull: { like: req.user._id } }
        )
        redirectPage(page, res, req);
    } catch (error) {
        console.log(error);
    }
}

async function save(req, res) {
    try {
        const page = req.body.page;
        await User.updateOne(
            { _id: req.user._id },
            { $push: { saved: req.params.id } }
        )
        redirectPage(page, res, req);
    } catch (error) {
        console.log(error);
    }
}

async function unsave(req, res) {
    try {
        const page = req.body.page;
        await User.updateOne(
            { _id: req.user._id },
            { $pull: { saved: req.params.id } }
        )
        redirectPage(page, res, req);
    } catch (error) {
        console.log(error);
    }
}

async function deletePhoto(req, res) {
    try {
        const page = req.body.page;
        await Photo.deleteOne({ _id: req.params.id });
        redirectPage(page, res, req);
    } catch (error) {
        console.log(error);
    }
}

async function show(req, res) {
    try {
        const photo = await Photo.findById(req.params.id).populate("authorId");
        res.render('photos/show', {title: "Add Comments", photo});
    } catch (error) {
        console.log(error);
    }
}

async function comments(req, res){
    try {
        const photo = await Photo.findById(req.params.id);
        req.body.authorId = req.user._id;
        req.body.authorName = req.user.name;
        photo.comments.push(req.body);
        res.redirect(`/photos/${req.params.id}`)
    } catch (error) {
        
    }
}



function redirectPage(page, res, req) {
    switch (page) {
        case 'index':
            return res.redirect('/');
        case 'saved':
            return res.redirect('/profile/saved');
        case 'profile':
            return res.redirect('/profile');
        case 'photo':
            return res.redirect(`/photos/${req.params.id}`);
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
    show, 
    comments
};