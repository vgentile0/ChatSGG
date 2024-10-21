import React from 'react'

export default function RequestsBtn(props) {
  return (
    <button onClick={(idUser, status) => props.handleFriendShip(props.idSender, props.description)}>{props.description}</button>
  )
}
