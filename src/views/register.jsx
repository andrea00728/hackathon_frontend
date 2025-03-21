import React, { useRef, useState } from 'react';
import { useStateContext } from '../context/ContextProvider';
import { useNavigate } from 'react-router-dom';
export default function Register(){
    const AddUserForm=()=>{
        const nameRef=useRef();
        const firstNameRef=useRef();
        const phoneRef=useRef();
        const sexRef=useRef();
        const emailRef=useRef();

        const [error,setError]=useState({});
        const {token}=useStateContext();
        const navigate=useNavigate();

       const validateNameAndFirstName=(value)=>{
        const nameRegex=/^[a-zA-Z\s]*$/;
        return nameRegex.test(value);
       }

       const validatePhone=(value)=>{
        const phoneRegex=/^\d{10}$/;
        return phoneRegex.test(value);
       }

       const handleNameAndFirstName=(e)=>{
        const value=e.target.value;
        if(!validateNameAndFirstName(value)){
            e.target.value=value.slice(0,-1);
        }
       }
       const handlePhone=(e)=>{
        const value=e.target.value;
        if(!/^\d*$/.test(value) || value.length>10){
            e.target.value=value.slice(0,-1);
        }
    }

    const handleSubmit=async (e)=>{
        e.preventDefault();
        setError();
        
    }
    }
    return (
        <div>register</div>
    );
}