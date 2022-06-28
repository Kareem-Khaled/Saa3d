const User = require('../models/user');
const Chat = require('../models/chat');

module.exports.findChat = async (req, res) =>{
    const users = [String(req.user._id), req.body.friend];
    users.sort();
    const chat = await Chat.findOne({'users':[users[0], users[1]]});
    if(!chat){
        const user1 = await User.findById(users[0]);
        const user2 = await User.findById(users[1]);
        const newChat = new Chat({ 
            users: [
                    user1,
                    user2
                ],
            messages:[]
        });
        await newChat.save(async (err, chat) => {
            res.redirect(`/chat/${chat._id}`);
        });
    }
    else
        res.redirect(`/chat/${chat._id}`);
}

module.exports.renderChat = async (req, res) =>{
    const chat = await Chat.findById(req.params.chatId).populate('messages');
    res.render('chats/chat', {chatId : chat._id, msgs: chat.messages});
}
