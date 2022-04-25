const User = require('../models/user');
const Post = require('../models/post');
const Notification = require('../models/notification');
const Comment = require('../models/comment');
const Service = require('../models/service');

module.exports.acceptOffer = async (req, res) => {
    // sending notification
    const {postId, commentId} = req.params;
    const post = await Post.findById(postId);
    const comment = await Comment.findById(commentId);
    const commentAuthor = await User.findById(comment.author);
    const notification = new Notification({
        user: req.user._id,
        date: Date.now(),
        body: `You have been chosen to complete '${post.header}' job`,
        link: `/post/${post._id}`
    });
    commentAuthor.notifications.push(notification);
    await notification.save();
    // create service
    service = new Service({
        customer:post.author,
        freelancer:comment.author,
        job:post._id,
        review:'Job still in progress',
        rate: 0
    });
    commentAuthor.services.push(service);
    await service.save();
    await commentAuthor.save();
    req.flash('success', `Your job in procces now`);
    res.redirect(`/post/${postId}`);            
};

module.exports.jobFinished = async (req, res) => {
    const {serviceId} = req.params;
    service = await Service.findById(serviceId);
    post = await Post.findById(service.job._id);
    const notification = new Notification({
        user: service.freelancer._id,
        date: Date.now(),
        body: `Your '${post.header}' job has been finished, it's your turn to give me a feedback`,
        link: `/profile/${service.freelancer._id}`
    });
    const customer = await User.findById(service.customer._id);
    customer.notifications.push(notification);
    await notification.save();
    await customer.save();
    res.redirect(`/main`);          
};

module.exports.postReview = async (req, res) => {
    const {serviceId} = req.params;
    service = await Service.findById(serviceId);
    console.log(service);
    res.redirect(`/main`);            
};
