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

//  --------------- Deposit ---------------
import { DepositPage } from './pages/Deposits/DepositPage';
import { GetDeposit } from './pages/Deposits/GetDeposit';
import { AddDeposit } from './pages/Deposits/AddDeposit';

/* CLIENT */
//  -------------- User ---------------
import { ProfilePage } from './pages/Profile/ProfilePage';
import { GetProfile } from './pages/Profile/GetProfile';
import { EditUser } from './pages/Profile/EditUser';

//  -------------- Transfers ---------------
import { TransferPage } from './pages/Transfers/TransferPage';
import { GetTransfers } from './pages/Transfers/GetTransfers';
import { AddTransfer } from './pages/Transfers/AddTransfer';

import ServiceClient from './pages/ServicesBank/ServiceClient';
import { ServiceADM } from './pages/ServicesBank/ServiceADM';
import LoanPage from './pages/LoanPage';
import GraphicsPage from './pages/GraphicsPage';

// -------------- Products ---------------
import { ProductPage } from './pages/product/ProductPage';
import { GetProducts } from "./pages/product/GetProducts";
import { UpdateProduct } from "./pages/product/UpdateProduct";
import { AddProduct } from "./pages/product/AddProduct";
import { ProductClientPage } from "./pages/product/ProductClientPage"
import { GetProductsForClient } from './pages/product/GetProductsForClient';
import { BuyProduct } from './pages/product/BuyProduct';
// -------------- Favorites ---------------
import { FavoritePage } from './pages/Favorites/FavoritePage';
import { GetFavorites } from "./pages/Favorites/GetFavorites";
/* import { UpdateFavorite } from "./pages/Favorites/UpdateFavorite"; */
import { AddFavorite } from "./pages/Favorites/AddFavorite";
import { UpdateFavorite } from './pages/Favorites/UpdateFavorite';

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
        },
        {
            path: 'deposit',
            element: <DepositPage></DepositPage>,
            children: [
                {
                    path: '',
                    element: <GetDeposit></GetDeposit>
                },
                {
                    path: 'addD',
                    element: <AddDeposit></AddDeposit>
                }
            ]
        },
        {
            path: 'service',
            element: <ServiceADM></ServiceADM>
        },
        {
            path: 'loan',
            element: <LoanPage></LoanPage>
        },
        {
            path: 'graphic',
            element: <GraphicsPage></GraphicsPage>
        },
        {
            path: 'product',
            element: <ProductPage></ProductPage>,
            children: [
                {
                    path: '',
                    element: <GetProducts></GetProducts>
                },
                {
                    path: 'add',
                    element: <AddProduct></AddProduct>
                },
                {
                    path: 'update/:id',
                    element: <UpdateProduct></UpdateProduct>
                }
            ]
        }

    ]

    const ADMINRoutes = [
    ]

    const CLIENTRoutes = [

        {
            path: 'profile',
            element: <ProfilePage />,
            children: [
                {
                    path: '',
                    element: <GetProfile />
                },
                {
                    path: 'edit',
                    element: <EditUser />
                }
            ]
        },
        {
            path: 'transfer',
            element: <TransferPage></TransferPage>,
            children: [
                {
                    path: '',
                    element: <GetTransfers></GetTransfers>
                },
                {
                    path: 'addT',
                    element: <AddTransfer></AddTransfer>
                }
            ]
        },
        {
            path: 'servicesClient',
            element: <ServiceClient></ServiceClient>
        },
        {
            path: 'product',
            element: <ProductClientPage></ProductClientPage>,
            children: [
                {
                    path: '',
                    element: <GetProductsForClient></GetProductsForClient>
                },
                {
                    path: 'buy/:id',
                    element: <BuyProduct></BuyProduct>
                }
            ]
        },
        {
            path: 'favorite',
            element: <FavoritePage></FavoritePage>,
            children: [
                {
                    path: '',
                    element: <GetFavorites></GetFavorites>
                },
                {
                    path: 'addfavorite',
                    element: <AddFavorite></AddFavorite>
                },
                {
                    path: 'updatefavorite/:_id',
                    element: <UpdateFavorite></UpdateFavorite>
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
