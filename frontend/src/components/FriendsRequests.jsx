import React, { useEffect, useState } from 'react';
import User from './User';
import RequestsBtn from './RequestsBtn';

export default function FriendsRequests(props) {
  

  return (
    <div>
      <h1>Richieste di amicizia</h1>
      {props.friendsReq.map((el, index) => (
        <>
        <User key={index} username={el.username} />
        <RequestsBtn key={index+10} description="accetta" idSender={el._id} handleFriendShip={props.handleFriendShip}></RequestsBtn>
        <RequestsBtn key={index+20} description="rifiuta" idSender={el._id} handleFriendShip={props.handleFriendShip}></RequestsBtn>
        </>
      ))}
    </div>
  );
}