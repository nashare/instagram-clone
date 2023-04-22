function home(req, res) {
    res.render('profile/profile', { title: "My Profile" });
}

module.exports = {
    home
};