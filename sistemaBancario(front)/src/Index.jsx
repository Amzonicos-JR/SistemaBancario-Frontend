import React, { useState, createContext, useEffect } from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { NotFound } from './pages/NotFound';
import { HomePage } from './pages/HomePage/HomePage';
import { LoginPage } from './pages/LoginPage';
import App from './App'
import { DashboardPage } from './pages/DashboardPage/DashboardPage';

/* ADMINAM */

//  --------------- Deposit ---------------
import { DepositPage } from './pages/Deposits/DepositPage';
import { GetDeposit } from './pages/Deposits/GetDeposit';
import { AddDeposit } from './pages/Deposits/AddDeposit';

/* CLIENT */

//  -------------- Transfers ---------------
import { TransferPage } from './pages/Transfers/TransferPage';
import { GetTransfers } from './pages/Transfers/GetTransfers';
import { AddTransfer } from './pages/Transfers/AddTransfer';

import ServiceClient from './pages/ServicesBank/ServiceClient';
import { ServiceADM } from './pages/ServicesBank/ServiceADM';
import LoanPage from './pages/LoanPage';
import GraphicsPage from './pages/GraphicsPage';

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
        }

    ]

    const CLIENTRoutes = [
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
