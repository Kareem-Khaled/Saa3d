// to access user db from models folder
const User = require('../models/user');

// rendering registering & login form 
module.exports.renderRegister = (req, res) => {
    res.render('users/login&signup', {path: req.path});
};

module.exports.renderProfile = (req, res) => {
    res.render('users/profile');
};

// registering new user and logging him in and redirect him to all campgrounds page
module.exports.register = async (req, res) => {
    try {
        const { remail, rusername, rpassword, city, gender } = req.body;
        const user = new User({ email:remail, username:rusername, city, gender });
        console.log(user);
        const registeredUser = await User.register(user, rpassword);
        req.login(registeredUser, err => {
            if (err) return next(err);
            req.flash('success', 'Welcome To Saa3d!');
            res.redirect('/profile');
        })
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('/register');
    }
};

// login user
module.exports.login = (req, res) => {
    req.flash('success', 'Welcome Back');
    // to know if user want to visit page before logging in
    const redirectUrl = '/home';
    delete req.session.returnTo;
    res.redirect('/profile');
};

// logging user out
module.exports.logout = (req, res) => {
    req.logout();
    req.flash('success', 'Good Bye');
    res.redirect('/home');
};