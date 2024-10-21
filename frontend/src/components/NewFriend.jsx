import React from 'react'
import { useState, useEffect } from "react";
import { newFriendRoute } from '../routes';
import axios from 'axios';

export default function NewFriend() {
    const [newFriend, setNewFriend] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const currentUser = JSON.parse(localStorage.getItem("chatSGG-user"));
        if(currentUser.username.toString() !== newFriend.toString()){
            const { data } = await axios.post(newFriendRoute, {
                currentUser,
                newFriend,
            });
            if(data.status === false) {
                alert(data.msg);
            }
            if(data.status === true) {
                alert("Richiesta di amicizia inviata correttamente!");
            }
        }
        else
            alert("Non puoi mandare l'amicizia a te stesso!");
    }
    const handleChange = async (e) => {
        setNewFriend(e.target.value); //mentre l'utente scrive aggiorno lo stato
    }
  return (
    <div>
        <h1>aggiungi amico</h1>
        <form onSubmit={handleSubmit}>
            <input name="username" type="text" placeholder="Username..." onChange={(e) => handleChange(e)}></input>
            <button type="submit">aggiungi amico</button>
        </form>
    </div>
  )
}
