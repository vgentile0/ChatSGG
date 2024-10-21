import React from 'react'
import MessageInput from './MessageInput'
import axios from 'axios'
import { messagesRoute } from '../routes'
import {useState, useEffect, useRef } from 'react'

export default function Chat(props) {
    const currentUser = JSON.parse(localStorage.getItem("chatSGG-user"));

    const sendMessage = async (msg) => {
        //aggiungo i socket
        props.socket.current.emit("send-msg", {
          receiver: props.selectedChat._id,
          sender: currentUser._id,
          msg,
        });
        const { data } = await axios.post(messagesRoute.toString() + "/addMsg", {
            currentUser,
            selectedChat: props.selectedChat,
            msg,
        });
        //creo un array in cui metto i messaggi attuali che ho inviato io e in cui aggiungo quelli che invio 
        const msgs = [...messages];
        msgs.push({ sentCurrent: true, message: msg });
        setMessages(msgs);
    }
    //mostro tutti i messaggi
    const [messages, setMessages] = useState([]);
    // ci sono due useEffect, uno per il caricamento iniziale della pagina, uno per quando cambia chat
    useEffect(() => {
        axios.post(messagesRoute.toString() + "/getMsgs", {
            currentUser,
            selectedChat: props.selectedChat,
        })
          .then((res) => {
            setMessages(res.data);
          })
          .catch((error) => {
            console.error(error);
          });
      }, []);

    const [arrivalMessage, setArrivalMessage] = useState(null);

    useEffect(() => {
        axios.post(messagesRoute.toString() + "/getMsgs", {
            currentUser,
            selectedChat: props.selectedChat,
        })
          .then((res) => {
            setMessages(res.data);
          })
          .catch((error) => {
            console.error(error);
          });
      }, [props.selectedChat]);

    //Socket per i messaggi nuovi ricevuti da altri
    useEffect(() => {
      if (props.socket.current) {
        props.socket.current.on("msg-receive", (data) => {
          if(data.sender.toString() === props.selectedChat._id.toString() && data.receiver.toString() === currentUser._id.toString())
            setArrivalMessage({ sentCurrent: false, message: data.msg });
        });
      }
    }, []);

    //se in arrivo c'è un nuovo messaggio, lo aggiunge a quelli attuali
    useEffect(() => {
      arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
    }, [arrivalMessage]);

    return (
    <div className="current-chat">
        <div>
            <h3 className="chat-contact">{props.selectedChat.username}</h3>
        </div>
        <div className="messages-container">
        {messages.map((msg) => {
        return (
            <div className={`message ${
                msg.sentCurrent ? "sended" : "recieved"
              }`}>
                <p className="content">{msg.message}</p>
              </div>
        )
        })}
        </div>
        <div className="message-input">
            <MessageInput sendMessage={sendMessage}></MessageInput>
        </div>
    </div>
  )
}
