const Photo = require('../models/photo');
const User = require('../models/user');

async function home(req, res) {
    try {
        const photos = await Photo.find({ authorId: req.user._id });
        res.render('profile/profile', { title: "My Profile", photos });
    } catch (error) {
        console.log(error);
    }
}

async function saved(req, res) {
    try {
        const photos = await User.findById(req.user._id).populate("saved");
        console.log(photos);
        res.render('profile/saved', { title: "My Collection", photos: photos.saved });
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    home,
    saved
};