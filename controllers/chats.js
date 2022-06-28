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
            user1.chats.push(chat._id);
            user2.chats.push(chat._id);
            await user1.save();
            await user2.save();
            res.redirect(`/chat/${chat._id}`);
        });
    }
    else
        res.redirect(`/chat/${chat._id}`);
}

module.exports.renderChat = async (req, res) =>{
    const chat = await Chat.findById(req.params.chatId).populate('messages');
    let name = '';
    for(let user of chat.users){
        if(!req.user._id.equals(user._id)){
            const friend = await User.findById(user._id);
            name = friend.username;
            break;
        }
    }
    res.render('chats/chat', {chatId : chat._id, msgs: chat.messages, name});
}

module.exports.renderMain = async (req, res) =>{
    const user = await User.findById(req.params.userId).populate('chats');
    const chats = [];
    for(let chat of user.chats){
        for(let user of chat.users){
            if(!user.equals(req.params.userId)){
                const friend = await User.findById(user);
                chats.push({
                    'name': friend.username,
                    'id': chat._id, 
                    'online': friend.isOnline
                });
            }
        }
    }
    res.render('chats/main', {chats});
}