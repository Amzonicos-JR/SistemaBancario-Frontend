import React, { useState, createContext, useEffect } from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { NotFound } from './pages/NotFound';
import { HomePage } from './pages/HomePage/HomePage';
import { LoginPage } from './pages/LoginPage';
import App from './App'
import { DashboardPage } from './pages/DashboardPage/DashboardPage';
//  ---------------Products
import { ProductPage } from './pages/product/ProductPage';
import { GetProducts } from "./pages/product/GetProducts";
import { UpdateProduct } from "./pages/product/UpdateProduct";
import { DeleteProduct } from "./pages/product/DeleteProduct";
import { AddProduct } from "./pages/product/AddProduct";

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
                    path: 'update',
                    element: <UpdateProduct></UpdateProduct>
                },
                {
                    path: 'delete',
                    element: <DeleteProduct></DeleteProduct>
                }
            ]
        }
    ]
/*
    const ADMINRoutes = [
    ]

    const CLIENTRoutes = [

    ]
*/
    const routes = createBrowserRouter([
        {
            path: '/',
            element: <App />,
            errorElement: <NotFound />,
            children: [
                {
                    path: '/',
                    element: <HomePage />
                },
                {
                    path: '/login',
                    element: <LoginPage></LoginPage>
                },
                {
                    path: '/home',
                    element:/*  loggedIn ? */ <DashboardPage></DashboardPage>, /* : <LoginPage></LoginPage> */
                    children: /* role === "ADMINAM" ? */ ADMINAMRoutes /* : */
                    //     role === "ADMIN" ? ADMINRoutes : CLIENTRoutes
                }
            ]
        }
    ])
    return (
        <AuthContext.Provider value={{ isAdmin, loggedIn, setLoggedIn, dataUser, setDataUser, role, id }}>
            <RouterProvider router={routes}></RouterProvider>
        </AuthContext.Provider>
    )
}
