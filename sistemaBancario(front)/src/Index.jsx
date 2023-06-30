import React, { useState, createContext, useEffect } from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { NotFound } from './pages/NotFound';
import { LoginPage } from './pages/LoginPage';
import App from './App'
import { DashboardPage } from './pages/DashboardPage/DashboardPage';

/* ADMINAM */
//  --------------- USERS ---------------
    import { UserPage } from './pages/Users/UserPage';
    import { AddUser } from './pages/Users/AddUser';
    import { GetUser } from './pages/Users/GetUser';
    import { UpdateUser } from './pages/Users/UpdateUser';


import { ProfilePage } from './pages/Profile/ProfilePage';
import { GetProfile } from './pages/Profile/GetProfile';
import { EditUser } from './pages/Profile/EditUser';

export const AuthContext = createContext();
export const Index = () => {
    const [role, setRole] = useState('')
    const [id, setId] = useState('')
    const [loggedIn, setLoggedIn] = useState(false)

    const [dataUser, setDataUser] = useState({
        name: '',
        username: '',
        role: ''
    })

    const [isAdmin, setIsAdmin] = useState('ADMIN');

    useEffect(() => {
        let token = localStorage.getItem('token')
        let role = localStorage.getItem('role')
        let id = localStorage.getItem('_id')
        if (token) {
            setLoggedIn(true)
            setRole(role)
            setId(id)
        }
    }, [])

    const ADMINAMRoutes = [
        {
            path: 'user',
            element: <UserPage></UserPage>,
            children: [
                {
                    path: '',
                    element: <GetUser></GetUser>
                },
                {
                    path: 'adduser',
                    element: <AddUser></AddUser>
                },
                {
                    path: 'updateuser/:_id',
                    element: <UpdateUser></UpdateUser>
                }
            ]
        }
    ]

    const ADMINRoutes = [
    ]

    const CLIENTRoutes = [
        
        {
            path:'profile',
            element:<ProfilePage/>,
            children:[
                {
                    path:'',
                    element:<GetProfile/>
                },
                {
                    path:'edit',
                    element:<EditUser/>
                }
            ]
        }
    ]

    const routes = createBrowserRouter([
        {
            path: '/',
            element: <App />,
            errorElement: <NotFound />,
            children: [
                {
                    path: '/',
                    element: <LoginPage />
                },
                {
                    path: '/dash',
                    element: loggedIn ? <DashboardPage></DashboardPage> : <LoginPage></LoginPage>,
                    children: role === "ADMINAM" ? ADMINAMRoutes : CLIENTRoutes
                }
                // {
                //     path: '/home',
                //     element:/*  loggedIn ? */ <DashboardPage></DashboardPage>, /* : <LoginPage></LoginPage> */
                //     children: /* role === "ADMINAM" ? */ ADMINAMRoutes /* : */
                //     //     role === "ADMIN" ? ADMINRoutes : CLIENTRoutes
                // }
            ]
        }
    ])
    return (
        <AuthContext.Provider value={{ isAdmin, loggedIn, setLoggedIn, dataUser, setDataUser, role, id }}>
            <RouterProvider router={routes}></RouterProvider>
        </AuthContext.Provider>
    )
}
