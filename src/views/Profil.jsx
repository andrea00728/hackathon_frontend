import React, { useEffect } from "react";
import { useStateContext } from "../context/ContextProvider";
import { data, useNavigate } from "react-router-dom";
import axiosCLient from "../axios-client";

export default function Profil(){
    const{user,token,setUser,setToken}=useStateContext();
    const navigate=useNavigate();
    useEffect(()=>{
        if(token){
            axiosCLient.get(`/`,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            .then(({data})=>{
                console.log("donnee recu:",data);
                setUser(data);
            })
            .catch((error)=>{
                console.log("erreur lors de la recuperation du profil",error);
                if(error.response && error.response.status===403){
                    console.log("acces refuse:verifier votre authorization");
                }
            });
        }
        else{
            console.log("token manquant");
            navigate("/login");
        }
    },[token,setUser]);
    return (
        <div>
            <img
            src={`http//localhost:3000/uploads/${user.image}`}
            alt="profil"
            className="w-8 h-8 rounded-full"
            />
        </div>
    )
}