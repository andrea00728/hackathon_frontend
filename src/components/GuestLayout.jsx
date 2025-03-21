import React from 'react';
import { useStateContext } from '../context/ContextProvider';
import { Navigate, Outlet } from 'react-router-dom';
export default function GuestLayout(){
    const{token}=useStateContext();
    if(token){
        return <Navigate to="/accueil"/>
    }
    // const navItems=[
    //     {path:'/login',label:'Login'},
    //     {path:'/register',label:'Register'}
    // ]
    return (
        <div>
            <Outlet/>
        </div>
    );
}