const Post = require('../models/post');
const User = require('../models/user');
const Comment = require('../models/comment');

module.exports.renderMain = async (req, res) => {
    const posts = await Post.find({}).populate('author');
    const standing = await User.find({}).sort({'point': -1,'username':1 }).limit(10);
    res.render('posts/main', {posts, standing});
};

module.exports.showPost = async (req, res) => {
    const post = await Post.findById(req.params.id).populate({
        path: 'comments',
        populate: {
            path: 'author'
        }
    }).populate('author');
    if (!post) {
        req.flash('error', "can't find that post");
        return res.redirect('/main');
    }
    res.render('posts/show', { post });
};

module.exports.addComment = async (req, res) => {
    const post = await Post.findById(req.params.id);
    const comment = new Comment({author:req.user._id, body:req.body.comment});
    post.comments.push(comment);
    await comment.save();
    await post.save();
    req.flash('success', 'Successfuly add new comment');
    res.redirect(`/show/${req.params.id}`);
};
