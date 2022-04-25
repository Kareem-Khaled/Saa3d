const mongoose = require("mongoose");

const Post = require('../models/post');
const User = require('../models/user');
const Service = require('../models/service');

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

let kemo;
const addUsers = async() =>{
    await User.deleteMany({});
    for (let i = 0; i < users.length; i++) {
        let points = Math.floor(Math.random() * 100);
        const user = new User({ 
            email:users[i]+'@gmail.com',
            username:users[i],
            city:'Assiut',
            gender: (i < 4 ? 'male' : 'female'),
            point:points,
            joinedAt: Date.now(),
            image:{
                url: `https://res.cloudinary.com/dokcpejo1/image/upload/v1648513749/Saa3d/${(i < 4 ? 'maleNoProfile': 'femaleNoProfile')}`,
                filename: (i < 4 ? 'maleNoProfile' : 'femaleNoProfile')
            },
            notifications : [],
        });
        await User.register(user, '123');
    }
    console.log("- Users added");
}

const addPosts = async () => {
    await Post.deleteMany({});
    kemo = await User.find({username:'Kareem'});
    kemo = kemo[0];
    for (let i = 0; i < 30; i++) {
        let id = Math.floor(Math.random() * users.length);
        let points = Math.floor(Math.random() * 100);
        let user = users[id];
        const post = new Post({
            author: mongoose.Types.ObjectId(kemo._id),
            header:`This is a good header - ${i}`,
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

const addServives = async () => {
    await Service.deleteMany({});
    let talat = await User.find({username:'Talat'});
    let post = await Post.find({});
    talat = talat[0];
    const serv1 = new Service({
        customer:mongoose.Types.ObjectId(kemo._id),
        freelancer:mongoose.Types.ObjectId(talat._id),
        job:mongoose.Types.ObjectId(post[0]._id),
        review:'He is a great person who helped me very well!',
        rate:3
    })
    const serv2 = new Service({
        customer:mongoose.Types.ObjectId(kemo._id),
        freelancer:mongoose.Types.ObjectId(talat._id),
        job:mongoose.Types.ObjectId(post[0]._id),
        review:'Job still in progress',
        rate:0
    })
    talat.services.push(serv1);
    talat.services.push(serv2);
    await serv1.save();
    await serv2.save();
    await talat.save();
}

addUsers().then(() => {
    addPosts().then(() => {
        addServives().then(() => {
            mongoose.connection.close(); 
            console.log("Done");
        });
    });
});