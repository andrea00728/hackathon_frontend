import React from 'react';
import { useStateContext } from '../context/ContextProvider';
import { Link, Navigate, Outlet } from 'react-router-dom';
export default function DefaultLayout(){
    
    const{token,setUser,setToken}=useStateContext();
    if(!token){
        return <Navigate to="/login"/>
    }

    const handleLogout=()=>{
        setUser(null);
        setToken(null);
    }

    const navItems=[
        {path:'/accueil',label:'Accueil'}
    ];

    return (
        <>
         <header>
            <nav>
                {navItems.map((item)=>{
                   <Link key={item.path} to={item.path}>
                    <div>
                        {item.label}
                    </div>
                   </Link>
                })}
            </nav>
        </header>
        <div>
            <Outlet/>
        </div>

        </>
    );
}