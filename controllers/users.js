// to access user db from models folder
const User = require('../models/user');
const Country = require('../models/country');
const { cloudinary } = require('../cloudinary');
const { Image } = require('../models/user');

// rendering registering & login form 
module.exports.renderRegister = async (req, res) => {
    const cities = await Country.find({name : 'Egypt'});
    res.render('users/login&signup', {path: req.path, cities: cities[0].cities});
};

module.exports.renderProfile = async (req, res) => {
    const user = await User.findById(req.params.userId).populate({
        path: 'services',
        populate: {
            path: 'customer'
        }
    }).populate({
        path: 'services',
        populate: {
            path: 'job'
        }
    });
    
    res.render('users/profile', {user});
};

module.exports.renderSettings = async (req, res) => {
    const user = await User.findById(req.params.userId);
    res.render('users/settings', {user});
};


// registering new user and logging him in and redirect him to all users page
module.exports.register = async (req, res) => {
    try {
        const { remail, rusername, rpassword,confirmPassword ,city, gender } = req.body;
        let img = {
            url: `https://res.cloudinary.com/dokcpejo1/image/upload/v1648513749/Saa3d/${(gender == 'male'? 'maleNoProfile': 'femaleNoProfile')}`,
            filename: (gender == 'male'? 'maleNoProfile' : 'femaleNoProfile')
        };
        const user = new User({ 
            email:remail, 
            username:rusername, 
            city, 
            gender,
            point: 0,
            service: 0,
            joinedAt: Date.now(),
            image: img,
            isOnline: true,
            notifications: [],
            services: []
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

module.exports.updateSettings = async (req, res, next) => {
    const user = await User.findById(req.params.userId);
    const images = req.files.map(f => ({ url: f.path, filename: f.filename }));
    if(images[0] && user.image.filename != 'maleNoProfile' && user.image.filename != 'femaleNoProfile'){
        await cloudinary.uploader.destroy(user.image.filename);
    }
    if(images[0]){
        user.image = images[0];
        await user.save();
    }
    const {oldPassword, newPassword, confirmNewPassword} = req.body;
    if(oldPassword != '' && newPassword != '' && confirmNewPassword != ''){
        if(newPassword != confirmNewPassword){
            req.flash('error', "The two passwords aren't identical");
            return res.redirect(`/profile/${req.params.userId}/settings`);
        }
        await user.changePassword(oldPassword, newPassword)
                  .then(e => {
                    req.flash('success', 'Succesfuly updated your info');
                    res.redirect(`/profile/${req.params.userId}`);            
                  })
                  .catch(e => {
                    req.flash('error', 'Check the old password');
                    res.redirect(`/profile/${req.params.userId}/settings`);
                })
    }
    else{
        req.flash('success', 'Succesfuly updated your info');
        res.redirect(`/profile/${req.params.userId}`);
    }
 };

// login user
module.exports.login = async (req, res) => {
    req.flash('success', `Welcome back ${req.user.username}!!!`);
    const user = await User.findById(req.user._id);
    user.isOnline = true;
    await user.save();
    // to know if user want to visit page before logging in
    // const redirectUrl = '/home';
    // delete req.session.returnTo;
    res.redirect(`/profile/${req.user._id}`);
};


// logging user out
module.exports.logout = async (req, res) => {
    const user = await User.findById(req.user._id);
    user.isOnline = false;
    await user.save();
    req.flash('success', `Good bye ${req.user.username} let us see you soon`);
    req.logout();
    res.redirect('/login');
};
