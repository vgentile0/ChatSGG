import React from 'react'
import NewFriend from './NewFriend'
import FriendsRequests from './FriendsRequests'
import AllFriends from './AllFriends'
import {useState, useEffect} from 'react'
import { friendsRoute } from '../routes';
import axios from 'axios';

export default function FriendsContainer() {

  //Friends requests
  const [friendsReq, setFriendsReq] = useState([]);
  const [friendShipChanges, setFriendShipChanges] = useState(false); //serve per ricaricare le richieste al server nel momento in cui un'amicizia viene approvata o rifiutata
  const currentUser = JSON.parse(localStorage.getItem("chatSGG-user"));

  useEffect(() => {
    const allFriendsRoute = friendsRoute.toString() + currentUser._id + "/friends-requests";
    axios.get(allFriendsRoute)
      .then((res) => {
        const friendsRequestsData = res.data.friendsRequests;
        setFriendsReq(friendsRequestsData);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [friendShipChanges]);

  const handleFriendShip = (idSender, status) => {
    axios.post (friendsRoute.toString() + "/manage-request", {idFriendReq: idSender, idCurrentUser: currentUser._id, status: status}).then((res) => {
      if(res.data.status){
        setFriendShipChanges(!friendShipChanges);
        alert(res.data.msg);
      }
    })
  }

  //remove friend
  const removeFriend = async (idFriend) => {
    const currentUser = JSON.parse(localStorage.getItem("chatSGG-user"));
    const { data } = await axios.post(friendsRoute.toString() + "remove-friend", {
            currentUser,
            idFriend,
        });
  
        if(data.status)
          setFriendShipChanges(!friendShipChanges);
        
        alert(data.msg);
  }

  //All friends
  const [friendsList, setFriendsList] = useState([]);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("chatSGG-user"));
    const allFriendsRoute = friendsRoute.toString() + currentUser._id + "/all";

    axios.get(allFriendsRoute)
      .then((res) => {
        const friendsData = res.data.friends;
        setFriendsList([...friendsData]);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [friendShipChanges]); //devo aggiornare se accetto o rifiuto una richiesta

  return (
    <div className='friends-container'>
        <AllFriends removeFriend={removeFriend} friendsList={friendsList}></AllFriends>
        <FriendsRequests friendsReq={friendsReq} handleFriendShip={handleFriendShip}></FriendsRequests>
        <NewFriend></NewFriend>
    </div>
  )
}
