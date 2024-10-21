const Message = require("../models/message");

module.exports.addMsg = async (req, res, next) => {
    try {
        const sender = req.body.currentUser;
        const receiver = req.body.selectedChat;
        const msg = req.body.msg;
        
        const data = await Message.create({
            sender: sender._id,
            receiver: receiver._id,
            message: {text: msg}
          });

        if (data) return res.json({ msg: "Messaggio Inviato correttamente!" });
        else return res.json({ msg: "Errore nell'invio del messaggio" });
      } catch (err) {
        console.log(err);
    }
}

module.exports.getMsgs = async (req, res, next) => {
    try {
        const sender = req.body.currentUser;
        const receiver = req.body.selectedChat;
        
        const data = await Message.find({
            $or: [
                    { $and: [
                        {sender: sender._id},
                        {receiver: receiver._id}
                    ]},
                    { $and: [
                        {sender: receiver._id},
                        {receiver: sender._id}
                    ]},
            ]
        }).sort({ updatedAt: 1 });

        const filteredMsgs = data.map((msg) => {
            if(msg.sender._id.toString() === sender._id.toString())
                return {
                    sentCurrent: true,
                    message: msg.message.text,
                }
            else
            return {
                sentCurrent: false,
                message: msg.message.text,
            }
        });
        return res.json(filteredMsgs);

      }catch (err) {
        console.log(err);
    }
}