import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { friendsRoute } from '../routes';
import User from './User';

export default function AllFriends(props) {

  return (
    <div>
      <h1>Amici</h1>
      {props.friendsList.map((friend, index) => (
        <>
          <User key={index} username={friend.username} />
          <button onClick={() => props.removeFriend(friend._id)}>rimuovi</button>
        </>
      ))}
    </div>
  );
}