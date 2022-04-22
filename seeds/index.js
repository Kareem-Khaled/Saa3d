const mongoose = require("mongoose");

const Post = require('../models/post');
const User = require('../models/user');

mongoose
    .connect("mongodb://127.0.0.1:27017/saa3d")
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!!");
    })
    .catch((err) => {
        console.log("OH NO MONGO CONNECTION ERROR!!!!");
        console.log(err);
    });

let users = ['Kareem', 'Talat', 'Shenawi', 'Mokn3', 'Fatma',
             'Olivia','Nancy', 'Sofiya'];

const addUsers = async() =>{
    await User.deleteMany({});
    for (let i = 0; i < users.length; i++) {
        let points = Math.floor(Math.random() * 100);
        let services = Math.floor(Math.random() * 20);
        const user = new User({ 
            email:users[i]+'@gmail.com',
            username:users[i],
            city:'Assiut',
            gender: (i < 4 ? 'male' : 'female'),
            point:points,
            service:services,
            joinedAt: Date.now(),
            image:{
                url: `https://res.cloudinary.com/dokcpejo1/image/upload/v1648513749/Saa3d/${(i < 4 ? 'maleNoProfile': 'femaleNoProfile')}`,
                filename: (i < 4 ? 'maleNoProfile' : 'femaleNoProfile')
            },
            notifications : []
        });
        await User.register(user, '123');
    }
    console.log("- Users added");
}

const addPosts = async () => {
    await Post.deleteMany({});
    for (let i = 0; i < 30; i++) {
        let id = Math.floor(Math.random() * users.length);
        let points = Math.floor(Math.random() * 100);
        let user = users[id];
        const post = new Post({
            author: '62623bd69d7e2a16265d4f9d',
            header:'This is a good header',
            body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto quos, cupiditate quod doloremque facere iure, perspiciatis a aspernatur, recusandae laboriosam quis quaerat sit qui vero ut expedita tempore atque asperiores. Some quick example text to build on the card title and make up the bulk of the card's content." ,
            city:'Assiut',
            point: points,
            createdAt: Date.now(),
            updatedAt: null,
            comments:[],
        })
        await post.save();
    }
    console.log("- Posts added");
}

addPosts().then(() => {
    mongoose.connection.close();
    console.log("Done");
});