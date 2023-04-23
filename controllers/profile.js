const Photo = require('../models/photo');
const User = require('../models/photo');

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
        const user = await User.findById(req.user._id).populate('saved');
        console.log(user);
        //res.render('profile/saved', { title: "My Collection", photos });
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    home,
    saved
};