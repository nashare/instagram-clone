const Photo = require('../models/photo');
const User = require('../models/user');

async function home(req, res) {
    try {
        const photos = await Photo.find({ authorId: req.user._id });
        photos.reverse();
        res.render('profile/profile', { title: "My Profile", photos });
    } catch (error) {
        console.log(error);
        res.render('error', {title: 'Something Went Wrong'});
    }
}

async function edit(req, res){
    try {
        res.render('profile/edit', {title: 'My New Profile'});
    } catch (error) {
        res.render('error', {title: "Something Went Wrong"});
    }
}
async function update(req, res){
    try {
        console.log(req.body);
        User.updateOne(
            { _id: req.user._id },
            { $set: { name: req.body.name, avatar: req.body.avatar } }
          );
          res.redirect('/profile');
    } catch (error) {
        res.render('error', {title: 'Something Went Wrong'});
    }
}

async function saved(req, res) {
    try {
        const photos = await User.findById(req.user._id).populate("saved");
        photos.reverse();
        res.render('profile/saved', { title: "My Collection", photos: photos.saved });
    } catch (error) {
        console.log(error);
        res.render('error', {title: 'Something Went Wrong'});
    }
}

module.exports = {
    home,
    saved,
    edit,
    update
};