import React from 'react';
import { useStateContext } from '../context/ContextProvider';
import { Link, Navigate, Outlet } from 'react-router-dom';
export default function DefaultLayout(){
    
    const{token,setUser,setToken}=useStateContext();
    if(!token){
        return <Navigate to="/accueilGuestLayout"/>
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
         <header className='w-full bg-light md:bg-transparent fixed top-0 left-0 rigth-0 !z-[10001]'>
            <nav className='flex justify-between items-center text-base gap-8'>
                <div>logo</div>
                <div className='md:flex space-x-12 hidden'>
                {navItems.map((item)=>{
                   <Link key={item.path} to={item.path}>
                    <div>
                        {item.label}
                    </div>
                   </Link>
                })}
                </div>
            </nav>
        </header>
        <div>
            <Outlet/>
        </div>

        </>
    );
}