import React from 'react'
import Contact from './Contact'
import { useState, useEffect } from 'react'
import Chat from './Chat';

export default function ChatContainer(props) {
 const [selectedChat, setSelectedChat] = useState(undefined); //chat mostrata a destra
 
 const handleChangeChat = (c) => {
  setSelectedChat(c);
 }

  return (
    <div className='chat-container'>
      <div className='friends-chats'>
        <Contact friendsList={props.friendsList} changeChat={handleChangeChat}></Contact>
      </div>
      {selectedChat === undefined ? (<h1>Welcome {props.loggedUser.nome}</h1>) : (<Chat socket={props.socket} selectedChat={selectedChat}></Chat>)}
    </div>
  )
}
