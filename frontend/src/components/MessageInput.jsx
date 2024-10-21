import React from 'react'
import { useState } from 'react'

export default function MessageInput(props) {
    const [msg, setMsg] = useState("");
    const sendNewMsg = (e) => {
        e.preventDefault();
        if(msg.length>0) {
            props.sendMessage(msg);
            setMsg("");
        }
    }
  return (
    <div>
        <form onSubmit={sendNewMsg}>
            <input className="msg-box"type="text" placeholder='Inserisci qui il tuo messaggio...' value={msg} onChange={(e) => setMsg(e.target.value)}></input>
            <button className='msg-send' type="submit">Invia</button>
        </form>
    </div>
  )
}
