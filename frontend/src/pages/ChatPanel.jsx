import React from 'react'
import ChatContainer from '../components/ChatContainer'
import Navbar from '../components/Navbar'
import FriendsContainer from '../components/FriendsContainer'
import { useState, useEffect } from 'react'
import { friendsRoute } from '../routes';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { io } from "socket.io-client";
import { useRef } from 'react';

export default function ChatPanel() {
  const [loggedUser, setLoggedUser] = useState({_id : null, nome: null, cognome: null, username: null, email: null, password: null, __v: null});

  const [showFriendsContainer, setShowFriendsContainer] = useState(false);
  const [showChatContainer, setShowChatContainer] = useState(false);
  
  const navigate = useNavigate();
  const socket = useRef();  //utilizzo di useRef perchè a differenza dello stato, devo mantenere il riferimento al socket tra i componenti

  useEffect(() => {
    if(!localStorage.getItem("chatSGG-user")) {
      navigate("/login");
    } else {
      setLoggedUser(JSON.parse(localStorage.getItem("chatSGG-user")));
    }
  }, []); 

  //socket
  useEffect(() => {
    if (loggedUser) {
      socket.current = io("http://localhost:4000");
      setShowChatContainer(true);
    }
  }, [loggedUser]);

  const handleClick = (e) => {
    if(e === "amici"){
      setShowFriendsContainer(true);
      setShowChatContainer(false);
    } else if(e === "chat"){
      setShowFriendsContainer(false);
      setShowChatContainer(true);
    }else if(e === "logout"){
      localStorage.clear();
      navigate("/login");
  }
  };

  const [friendsList, setFriendsList] = useState([]);

  
  useEffect(() => {
    if(loggedUser){
      const allFriendsRoute = friendsRoute.toString() + loggedUser._id + "/all";
      axios.get(allFriendsRoute)
        .then((res) => {
          const friendsData = res.data.friends;
          setFriendsList([...friendsData]);
        })
        .catch((error) => {
          console.error(error);
        });
    }
    else{
      navigate("/login");
    }
    
  }, [showFriendsContainer, showChatContainer]);
  

  return (
    <main className="container">
      <Navbar loggedUser={loggedUser} handleClick={handleClick}></Navbar>
      {showFriendsContainer ? <FriendsContainer /> : <></>}
      {showChatContainer ? <ChatContainer socket = {socket} loggedUser={loggedUser} friendsList={friendsList}/> : <></>}
    </main>
  )
}
