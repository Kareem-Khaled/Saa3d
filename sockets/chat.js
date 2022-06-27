// const User = require("../models/user");

module.exports = (io) =>{
    io.on('connection', socket => {
        socket.on('joinChatRoom', chatId =>{
            socket.join(chatId);
        })
    
        socket.on('newMsg', (chatId, msg) =>{
            io.to(chatId).emit('addMsg', msg);
        })
        
    })
}