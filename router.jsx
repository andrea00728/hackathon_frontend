import React from 'react';
import { Navigate, createBrowserRouter } from 'react-router-dom';
import DefaultLayout from './src/components/DefaultLayout';
import Accueil from './src/views/accueil';
import GuestLayout from './src/components/GuestLayout';
import Register from './src/views/Register';
import Notfound from './src/views/notFound';
import Login from './src/views/login';
import AccueilGuest from './src/views/accueilGuest';
import Aprops from './src/views/aprops';
import Contact from './src/views/contact';

const router=createBrowserRouter([
    {
        path:'/',
        element:<DefaultLayout/>,
        children:[
            {
                path:'/',
                element:<Navigate to="/accueil"/>
            },
            {
                path:'/accueil',
                element:<Accueil/>
            }
        ],
    },
    {
        path:'/',
        element:<GuestLayout/>,
        children:[
            {
                path:'/',
                element:<Navigate to='/accueilGuestLayout'/>
            },
            {
                path:'/accueilGuestLayout',
                element:<AccueilGuest/>
            },
            {
                path:'/apropos',
                element:<Aprops/>
            },
            {
                path:'/contact',
                element:<Contact/>
            },
            {
                path:'/login',
                element:<Login/>
            },
            {
                path:'/register',
                element:<Register/>
            },
            
        ],
    },
    {
        path:'*',
        element:<Notfound/>
    }
]);
export default router;