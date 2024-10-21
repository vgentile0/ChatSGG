import React from 'react'
import { Link } from "react-router-dom";

export default function LoginContainer(props) {
  return (
    <>
    <form className="form-user" onSubmit={(e) => props.handleSubmit(e)}>
        <h1>ChatSGG Login</h1>
        <input type="text" name="username" placeholder="Username" min="3" onChange={(e) => props.handleChange(e)}/>
        <input type="password" name="password" placeholder="Password" min="8" onChange={(e) => props.handleChange(e)}/>
        <button type="submit">Login</button>
        <span>Non hai un account? <Link to="/register">Register</Link></span>
    </form>
    </>
  )
}
