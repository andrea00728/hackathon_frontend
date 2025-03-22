import React from 'react';
import { useStateContext } from '../context/ContextProvider';
import { Link, Navigate, Outlet } from 'react-router-dom';
export default function GuestLayout(){
    const{token}=useStateContext();
    if(token){
        return <Navigate to="/"/>
    }
    const navinscription=[
        {path:'/register',label:'inscription'}
    ];
    const navItems=[
        {path:'/accueilGuestLayout',label:'accueil'},
        {path:'/apropos',label:'apropos'},
        {path:'/contact',label:'contact'}
    ]
    return (
        <>
        <header className='w-full  md:bg-transparent fixed top-0 left-0 rigth-0 !z-[10001]'> 
            <nav className=' text-[#3E3F5B] items-center w-[90%] h-[50px]  mt-[10px] m-auto'>
                <div className='flex justify-between items-center text-base gap-8'>
                    <h1>logo</h1>
                    <div className='md:flex hidden items-center space-x-12'>
                        {navItems.map((e)=>(
                            <Link key={e.path} to={e.path}>
                                {e.label}
                            </Link>
                        ))}
                    </div>
                    <div className="md:flex hidden items-center justify-center space-x-12 rounded-full w-30 h-10 text-white font-semibold bg-[#3E3F5B]">
                       {navinscription.map((item)=>(
                        <Link className=' ' key={item.path} to={item.path}>
                            {item.label}
                        </Link>
                       ))} 
                    </div>
                </div>
            </nav>
        </header>
        <div className='mt-[5%]'>
            <Outlet/>
        </div>
        </>
    );
}