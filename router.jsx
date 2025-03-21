import React from 'react';
import { Navigate, createBrowserRouter } from 'react-router-dom';
import DefaultLayout from './src/components/DefaultLayout';
import Accueil from './src/views/accueil';
import GuestLayout from './src/components/GuestLayout';
import Login from './src/views/Login';
import Register from './src/views/Register';
import Notfound from './src/views/notFound';

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
                path:'/login',
                element:<Login/>
            },
            {
                path:'/register',
                element:<Register/>
            }
        ],
    },
    {
        path:'*',
        element:<Notfound/>
    }
]);
export default router;