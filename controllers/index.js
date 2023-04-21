function home(req, res) {
    res.render('index', {title: "Instagram Clone"});
}

module.exports = {
    home
};