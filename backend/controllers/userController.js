const User = require("../models/user");
const bcrypt = require("bcrypt");
const Friendship = require ("../models/friendship");
const Message = require("../models/message");

module.exports.register = async (req, res, next) => {
    try {
        nome = req.body.nome;
        cognome = req.body.cognome;
        username = req.body.username;
        email = req.body.email;
        password = req.body.password;
        const usernameCheck = await User.findOne({ username });
        if(usernameCheck)
            return res.json({msg:"Username già esistente! Riprova", status: false});
        const emailCheck = await User.findOne({ email });
            if(emailCheck)
                return res.json({msg:"Email già registrata! Riprova", status: false});
        const cryptPass = await bcrypt.hash(password, 10);
        const user = await User.create({
            nome,
            cognome,
            username,
            email,
            password: cryptPass,
        });
        delete user.password;
        return res.json({status: true, user});
    }
    catch (e){
       console.log(e);
    }
};

//Login module

module.exports.login = async (req, res, next) => {
    try {
        username = req.body.username;
        password = req.body.password;
        const user = await User.findOne({ username });
        if(!user)
            return res.json({msg:"Username o password errati!", status: false});
        const passwordCheck = await bcrypt.compare(password, user.password);
        if(!passwordCheck)
                return res.json({msg:"Username o password errati!", status: false});
        delete user.password;
        return res.json({status: true, user});
    }
    catch (e){
       console.log(e);
    }
};

module.exports.newFriend = async (req, res, next) => {
    try {
        const user = await User.findOne({ "username" : req.body.currentUser.username });
        const newFriend = await User.findOne({ "username" : req.body.newFriend });

        if(!newFriend)
            return res.json({msg:"L'utente che vuoi aggiungere non esiste", status: false});

        Friendship.findOne({
            $or: [
                    { $and: [
                        {requester: user._id},
                        {receiver: newFriend._id}
                    ]},
                    { $and: [
                        {requester: newFriend._id},
                        {receiver: user._id}
                    ]},
            ]
        }).then ((result) => { 
            const friends = result;
            if(friends)
                //aggiungere altri controlli su status per messaggi personalizzati
                switch(friends.statusFriend){
                    case 0:
                        return res.json({msg:"La richiesta è stata già inoltrata!", status: false});
                        break;
                    case 1:
                        return res.json({msg:"Siete già amici!", status: false});
                        break;
                    case 2:
                        return res.json({msg:"Richiesta rifiutata, impossibile aggiungere amico!", status: false});
                        break;
                }
                
            else {
                Friendship.create({
                    requester: user._id,
                    receiver: newFriend._id,
                    statusFriend: 0,
                })
                return res.json({status: true});
            }
        })
        .catch(e => console.log(e));
    
    }
    catch (e){
       console.log(e);
    }
}


module.exports.allFriends = async (req, res, next) => {
    const idUser = req.params.id;
    Friendship.find({
        $or: [
                { $and: [
                    {requester: idUser},
                    {statusFriend: 1}
                ]},
                { $and: [
                    {receiver: idUser},
                    {statusFriend: 1}
                ]},
        ]
    }).populate("requester")
    .populate("receiver")
    .then ((result) => { 
        const friends = result.map( (c) => {
            if(c.requester._id.toString() === idUser.toString()){ //senza toString non funzionava
                return { username: c.receiver.username, _id: c.receiver._id };
            }     
            else
            return { username: c.requester.username, _id: c.requester._id };
        });

        return res.json({friends: friends, status: true});
    })
    .catch(e => console.log(e));
}

module.exports.friendsRequests = async (req, res, next) => {
    const idUser = req.params.id;
    Friendship.find({
        $or: [
                { $and: [
                    {requester: idUser},
                    {statusFriend: 0}
                ]},
                { $and: [
                    {receiver: idUser},
                    {statusFriend: 0}
                ]},
        ]
    }).populate("requester")
    .populate("receiver")
    .then ((result) => { 
        const toAccept = result.map( (c) => {
            if(c.requester._id.toString() === idUser.toString()){ //senza toString non funzionava
                return { username: c.receiver.username, _id: c.receiver._id };
            }     
            else
                return { username: c.requester.username, _id: c.requester._id };
        });

        return res.json({friendsRequests: toAccept, status: true});
    })
    .catch(e => console.log(e));
}

module.exports.manageRequests = async (req, res, next) => {
   const idFriendReq = req.body.idFriendReq;
   const idCurrentUser = req.body.idCurrentUser;
   const status = req.body.status;
   if(status === "accetta"){
    Friendship.updateOne({
        $or: [
                { $and: [
                    {requester: idFriendReq},
                    {receiver: idCurrentUser}
                ]},
                { $and: [
                    {requester: idCurrentUser},
                    {receiver: idFriendReq}
                ]},
        ]
    }, { $set: { statusFriend: 1 } })
    .then((result) => {
        if(result.acknowledged)
            return res.json({ msg: "Richiesta accettata!", status: true});
    }).catch(e => console.log(e));

   }
   else if(status === "rifiuta"){
    Friendship.updateOne({
        $or: [
                { $and: [
                    {requester: idFriendReq},
                    {receiver: idCurrentUser}
                ]},
                { $and: [
                    {requester: idCurrentUser},
                    {receiver: idFriendReq}
                ]},
        ]
    }, { $set: { statusFriend: 2 } })
    .then((result) => {
        if(result.acknowledged)
            return res.json({ msg: "Richiesta rifiutata!", status: true});
    }).catch(e => console.log(e));

   }  
}

module.exports.removeFriend = async (req, res, next) => {
    const idFriend = req.body.idFriend;
    const idCurrentUser = req.body.currentUser;

     Friendship.deleteOne({
         $or: [
                 { $and: [
                     {requester: idFriend},
                     {receiver: idCurrentUser}
                 ]},
                 { $and: [
                     {requester: idCurrentUser},
                     {receiver: idFriend}
                 ]},
         ]
     })
     .then((result) => {
        Message.deleteMany({
            $or: [
                    { $and: [
                        {sender: idFriend},
                        {receiver: idCurrentUser}
                    ]},
                    { $and: [
                        {sender: idCurrentUser},
                        {receiver: idFriend}
                    ]},
            ]
        }).then((result) => {
            if(result.acknowledged)
            return res.json({ msg: "Amicizia rimossa correttamente!", status: true});
        })
    })
 }