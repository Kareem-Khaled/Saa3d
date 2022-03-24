// to access user db from models folder
const User = require('../models/user');

// rendering registering & login form 
module.exports.renderRegister = (req, res) => {
    res.render('users/login&signup', {path: req.path});
};

module.exports.renderProfile = async (req, res) => {
    const user = await User.findById(req.params.userId);
    res.render('users/profile', {user});
};

// registering new user and logging him in and redirect him to all campgrounds page
module.exports.register = async (req, res) => {
    try {
        const { remail, rusername, rpassword,confirmPassword ,city, gender } = req.body;
        const user = new User({ 
            email:remail, 
            username:rusername, 
            city, 
            gender,
            point: 0,
            service: 0,
            joinedAt: Date.now()
        });
        if(rpassword != confirmPassword){
            throw new Error("The two passwords aren't identical");   
        }
        const registeredUser = await User.register(user, rpassword);
        req.login(registeredUser, err => {
            if (err) return next(err);
            req.flash('success', `Welcome To Saa3d ${rusername}!!!`);
            res.redirect(`/profile/${registeredUser._id}`);
        })
    } catch (e) {
        if(e.message.includes('E11000'))// dublicate email error
           e.message = 'A user with the given email is already registered';
        req.flash('error', e.message);
        res.redirect('/register');
    }
};

// login user
module.exports.login = (req, res) => {
    req.flash('success', `Welcome back ${req.user.username}!!!`);
    // to know if user want to visit page before logging in
    const redirectUrl = '/home';
    delete req.session.returnTo;
    res.redirect(`/profile/${req.user._id}`);
};


// logging user out
module.exports.logout = (req, res) => {
    req.flash('success', `Good bye ${req.user.username} let us see you soon`);
    req.logout();
    res.redirect('/login');
};