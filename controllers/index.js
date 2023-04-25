const Photo = require('../models/photo');

async function home(req, res) {
    try {
        const photos = await Photo.find({}).populate("authorId");
        photos.reverse();
        res.render('index', { title: "Instagram Clone", photos });
    } catch (error) {
        console.log(error);
        res.render('error', {title: 'Something Went Wrong'});
    }
}

module.exports = {
    home
};