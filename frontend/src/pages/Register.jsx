import React from 'react'
import FormContainer from '../components/FormContainer'
import { useState, useEffect } from "react";
import axios from 'axios';
import { registerRoute } from "../routes";
import { useNavigate } from 'react-router-dom';

export default function Register() {
    const navigate = useNavigate();
    const [newUser, setNewUser] = useState({
        nome: "",
        cognome: "",
        username: "",
        email: "",
        password: "",
        confPassword: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(handleValidation()){
            const { nome, cognome, username, email, password, confPassword } = newUser;
            const { data } = await axios.post(registerRoute, {
                nome,
                cognome,
                username,
                email,
                password,
            });
            if(data.status === false) {
                alert(data.msg);
            }
            if(data.status === true) {
                alert("Utente creato correttamente!")   //Eventulamente andare a minuto 1:11 perchè salva le informazioni in locale con localStorage.setItem
                navigate("/login");  //se tutto ok mando l'utente alla chat
            }
        }
    }

    const handleValidation = () => {
        const {nome, cognome, username, email , password, confPassword } = newUser;
        if(password !== confPassword) {
            alert("Attenzione! Le password non coincidono!");
            return false;
        }

        return true;
    }

    const handleChange = (e) => {
        setNewUser({...newUser, [e.target.name]: e.target.value }); //mentre l'utente scrive aggiorno lo stato
    }
  return (
    <>
        <FormContainer handleSubmit = {handleSubmit} handleChange = {handleChange}></FormContainer>
    </>
  )
}