const Post = require('../models/post');
const User = require('../models/user');
const Country = require('../models/country');

module.exports.renderMain = async (req, res) => {
    const posts = await Post.find({}).sort({'createdAt' : -1}).populate('author');
    const standing = await User.find({}).sort({'point': -1,'username':1 }).limit(10);
    res.render('posts/main', {posts, standing});
};

module.exports.renderNewForm = async (req, res) => {
    const cities = await Country.find({name : 'Egypt'});
    res.render('posts/newPost', {cities: cities[0].cities});
};

module.exports.showPost = async (req, res) => {
    const cities = await Country.find({name : 'Egypt'});
    const post = await Post.findById(req.params.postId).populate({
        path: 'comments',
        populate: {
            path: 'author'
        }
    }).populate('author');
    
    if (!post) {
        req.flash('error', "can't find that post");
        return res.redirect('/main');
    }
    res.render('posts/post', { post, cities: cities[0].cities });
};

module.exports.createPost = async (req, res) => {
    const {header, body, city, point} = req.body;
    const post = new Post({
        author: req.user._id,
        header,
        body,
        city,
        point,
        createdAt: Date.now(),
        updatedAt: null,
        comments:[],
        isFinished: 0
    })
    await post.save();
    res.redirect('/main');
};

module.exports.updatePost = async (req, res) => {
    const post = await Post.findByIdAndUpdate(req.params.postId, req.body.post);
    post.updatedAt = Date.now();
    await post.save();
    req.flash('success', 'Succesfuly updated the post :) ');
    res.redirect(`/post/${req.params.postId}`);
};

module.exports.deletePost = async (req, res) => {
    await Post.findByIdAndDelete(req.params.postId);
    req.flash('success', 'Succesfully deleted the post');
    res.redirect('/main');
};