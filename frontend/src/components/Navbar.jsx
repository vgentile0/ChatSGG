import React from "react";
import Button from "./Button"

export default function Navbar({ loggedUser, handleClick }) {
  return (
    <nav>
      <ul id="nav-menu">
        <span>{loggedUser.username}</span>
        <Button description="chat" url="/" handleClick={handleClick}/>
        <Button description="amici" url="/" handleClick={handleClick}/>
        <Button description="logout" url="/" handleClick={handleClick}/>
      </ul>
    </nav>
  )
}