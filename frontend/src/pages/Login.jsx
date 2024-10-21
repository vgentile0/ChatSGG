import React from 'react'
import LoginContainer from '../components/LoginContainer'
import { useState, useEffect } from "react";
import axios from 'axios';
import { loginRoute } from "../routes";
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const navigate = useNavigate();
    const [logUser, setlogUser] = useState({
        username: "",
        password: "",
    });

    useEffect(()=> {
      if(localStorage.getItem("chatSGG-user")){
        navigate("/");
      }
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(handleValidation()){
            const { username, password } = logUser;
            const { data } = await axios.post(loginRoute, {
                username,
                password,
            });
            if(data.status === false) {
                alert(data.msg);
            }
            if(data.status === true) {
                alert("Login effettuato con successo!");
                localStorage.setItem("chatSGG-user", JSON.stringify(data.user));
                navigate("/");
            }
        }
    }

    const handleValidation = () => {
        const {username, password } = logUser;
        if(password === "") {
            alert("Attenzione! Il campo password è vuoto!");
            return false;
        } else if(username.length === "") {
          alert("Attenzione! Il campo username è vuoto!");
          return false;
        }

        return true;
    }

    const handleChange = (e) => {
        setlogUser({...logUser, [e.target.name]: e.target.value }); //mentre l'utente scrive aggiorno lo stato
    }
  return (
    <>
        <LoginContainer handleSubmit = {handleSubmit} handleChange = {handleChange}></LoginContainer>
    </>
  )
}