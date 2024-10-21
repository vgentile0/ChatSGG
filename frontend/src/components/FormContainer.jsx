import React from 'react'
import { Link } from "react-router-dom";

export default function FormContainer(props) {
  return (
    <>
    <form className="form-user" onSubmit={(e) => props.handleSubmit(e)}>
        <h1>ChatSGG</h1>
        <input type="text" name="nome" placeholder="Nome" onChange={(e) => props.handleChange(e)}/>
        <input type="text" name="cognome" placeholder="Cognome" onChange={(e) => props.handleChange(e)}/>
        <input type="text" name="username" placeholder="Username" onChange={(e) => props.handleChange(e)}/>
        <input type="email" name="email" placeholder="Email" onChange={(e) => props.handleChange(e)}/>
        <input type="password" name="password" placeholder="Password" onChange={(e) => props.handleChange(e)}/>
        <input type="password" name="confPassword" placeholder="Conferma Password" onChange={(e) => props.handleChange(e)}/>

        <button type="submit">Crea Utente</button>
        <span>Hai già un account? <Link to="/login">Login</Link></span>
    </form>
    </>
  )
}
