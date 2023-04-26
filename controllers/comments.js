const Photo = require('../models/photo');


async function create(req, res) {
    try {
        const photo = await Photo.findById(req.params.id);
        req.body.authorId = req.user._id;
        req.body.authorName = req.user.name;
        photo.comments.push(req.body);
        await photo.save();
        res.redirect(`/photos/${req.params.id}`)
    } catch (error) {
        res.render('error', { title: 'Something Went Wrong' });
    }
}

async function edit(req, res) {
    try {
        const photo = await Photo.findById(req.params.id);
        const comment = photo.comments.id(req.params.commentId);
        res.render('photos/comment-edit', { title: "Edit your comment", photoId: req.params.id, comment });
    } catch (error) {
        res.render('error', { title: 'Something Went Wrong' });
    }
}

async function update(req, res) {
    try {
        const photo = await Photo.findById(req.params.id);
        const comment = photo.comments.id(req.params.commentId);
        comment.text = req.body.text;
        await photo.save();
        res.redirect(`/photos/${req.params.id}`);
    } catch (error) {
        console.log(error);
        res.render('error', { title: 'Something Went Wrong' });
    }

};
async function deleteComment(req, res) {
    try {
        await Photo.updateOne(
            { _id: req.params.id },
            { $pull: { comments: { _id: req.params.commentId } } }
        );
        res.redirect(`/photos/${req.params.id}`);
    } catch (error) {
        console.log(error);
        res.render('error', { title: 'Something Went Wrong' });
    }
}

module.exports = {
    create,
    update,
    edit,
    delete: deleteComment,
};