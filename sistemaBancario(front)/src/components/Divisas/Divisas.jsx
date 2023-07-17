import React, { useEffect, useState, useContext } from 'react'
import { User } from '../User/User'
import axios from 'axios'
import { AuthContext } from "../../Index";

const Divisas = () => {
    const { id } = useContext(AuthContext);
    const [user, setUser] = useState({});
    const [cambio, setCambio] = useState({});
    const headers = {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token")
    }

    const getUser = async () => {
        try {
            const { data } = await axios.get(
                "http://localhost:3000/user/getProfile",
                { headers: headers }
            );
            console.log(data);
            if (data.user) {
                setUser(data.user);
            }
        } catch (err) {
            console.log(err);
            throw new Error(err.response.message || data, "Error getting users");
        }
    };

    const cambioDolar = async () => {
        try {
            const formData = { user: id }
            const { data } = await axios.post(
                "http://localhost:3000/cambios/dolar", formData);
                alert(data.message)
            if (data.cambio) {
                setCambio(data.cambio);
            }
        } catch (err) {
            console.log(err)
        }
    }

    const cambioEuro = async () => {
        try {
            const formData = { user: id }
            const { data } = await axios.post(
                "http://localhost:3000/cambios/euro", formData);
                alert(data.message)
            if (data.cambio) {
                setCambio(data.cambio);
            }
        } catch (err) {
            console.log(err)
        }
    }

    const cambioYen = async () => {
        try {
            const formData = { user: id }
            const { data } = await axios.post(
                "http://localhost:3000/cambios/yen", formData);
                alert(data.message)
            if (data.cambio) {
                setCambio(data.cambio);                
            }
        } catch (err) {
            console.log(err)
        }
    }

    const cambioLibra = async () => {
        try {
            const formData = { user: id }
            const { data } = await axios.post(
                "http://localhost:3000/cambios/libra", formData);
                alert(data.message)
            if (data.cambio) {
                setCambio(data.cambio);                
            }
        } catch (err) {
            console.log(err)
        }
    }

    const cambioMXN = async () => {
        try {
            const formData = { user: id }
            const { data } = await axios.post(
                "http://localhost:3000/cambios/mxn", formData);
                alert(data.message)
            if (data.cambio) {
                setCambio(data.cambio);
            }
        } catch (err) {
            console.log(err)
        }
    }


    useEffect(() => { getUser(); }, []);

    return (
        <>
        <br />
            <h1 className='text-center'>Welcome to Divisas</h1> <br />
            <h1 className='text-center'>User: {user.name} </h1>
            <h2 className='text-center'>Balance: Q {user.balance}</h2>
            <br /><br />
            <div style={{ textAlign: 'center' }}>
                <button type="button" className="btn btn-outline-success" onClick={cambioDolar}>Dolar</button>ㅤ
                <button type="button" className="btn btn-outline-danger" onClick={cambioEuro}>Euro</button>ㅤ
                <button type="button" className="btn btn-outline-warning" onClick={cambioYen}>Yen</button>ㅤ
                <button type="button" className="btn btn-outline-info" onClick={cambioLibra}>Libra</button>ㅤ
                <button type="button" className="btn btn-outline-success" onClick={cambioMXN}>MXN</button>
            </div>            
        </>
    )
}

export default Divisas
