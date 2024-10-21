import React from 'react'
import { useState } from 'react'

export default function Contact(props) {
    const [currentSelected, setCurrentSelected] = useState(undefined);
    const changeCurrentChat = (i, friend) => {
        setCurrentSelected(i);
        props.changeChat(friend);
    }
  return (
    <>
    {props.friendsList.map((friend, index) => {return (
        <>
          <div className={`contact ${
                    index === currentSelected ? "selected" : ""
                  }`}
                  onClick={() => changeCurrentChat(index, friend)} key={index}>
            <h3>{friend.username}</h3>
          </div>
        </>
      )})}
    </>
  )
}

