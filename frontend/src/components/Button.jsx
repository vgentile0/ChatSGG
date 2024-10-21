import React from "react";
import { Link } from "react-router-dom"

export default function Button({ handleClick, description, url }) {
  return <li className="li-nav" onClick={() => handleClick(description)}><Link to={url}> {description}</Link></li>
}