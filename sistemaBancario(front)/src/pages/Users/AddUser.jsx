import React, {useState, useEffect} from 'react'
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export const AddUser = () => {
    const navigate = useNavigate()
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
    }

    const addUser = async (e) => {
        try {
            e.preventDefault();
            let user = {
                DPI: document.getElementById('inputDPI').value,
                name: document.getElementById('inputName').value,
                surname: document.getElementById('inputSurname').value,
                username: document.getElementById('inputUsername').value,
                password: document.getElementById('inputPassword').value,
                email: document.getElementById('inputEmail').value,
                direction: document.getElementById('inputDirection').value,
                ingresosMensuales: document.getElementById('inputIngMensuales').value,
                balance: document.getElementById('inputBalance').value
            }
            console.log(headers, '2')
            const { data } = await axios.post('http://localhost:3000/user/createAccount', user, {headers: headers})
            alert(data.message)
            clear();
            navigate('/dash/user')
        } catch (err) {
            alert(err.response.data.message)
        }
    }

    const clear = async () => {
        try {
            document.getElementById('inputDPI').value = '',
                document.getElementById('inputName').value = '',
                document.getElementById('inputSurname').value = '',
                document.getElementById('inputUsername').value = '',
                document.getElementById('inputPassword').value = '',
                document.getElementById('inputEmail').value = '',
                document.getElementById('inputDirection').value='',
                document.getElementById('inputIngMensuales').value = '',
                document.getElementById('inputBalance').value = ''
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <>
            <h1>Agregar User</h1>
            <form className="m-5 text-center">
                <div className="mb-3">
                    <label htmlFor="inputDPI" className="form-label">DPI</label>
                    <input type="text" className="form-control" id="inputDPI" />
                </div>
                <div className="mb-3">
                    <label htmlFor="inputName" className="form-label">Name</label>
                    <input type="text" className="form-control" id="inputName"/>
                </div>
                <div>
                    <label htmlFor="inputSurname" className="form-label">Surname</label>
                    <input type="text" className="form-control" id="inputSurname"/>
                </div>
                <div>
                    <label htmlFor="inputUsername" className="form-label">Username</label>
                    <input type="text" className="form-control" id="inputUsername"/>
                </div>
                <div>
                    <label htmlFor="inputPassword" className="form-label">Password</label>
                    <input type="text" className="form-control" id="inputPassword"/>
                </div>
                <div>
                    <label htmlFor="inputEmail" className="form-label">Email</label>
                    <input type="text" className="form-control" id="inputEmail"/>
                </div>
                <div>
                    <label htmlFor="inputDirection" className="form-label">Direction</label>
                    <input type="text" className="form-control" id="inputDirection"/>
                </div>
                <div>
                    <label htmlFor="inputIngMensuales" className="form-label">Ingresos Mensuales</label>
                    <input type="number" className="form-control" id="inputIngMensuales"/>
                </div>
                <div>
                    <label htmlFor="inputBalance" className="form-label">Balance</label>
                    <input type="number" className="form-control" id="inputBalance"/>
                </div>  
                <br></br>
                <button onClick={(e) => addUser(e)} className="btn btn-success m-1">Create</button>

                <Link to='/dash/user'>
                    <button className="btn btn-danger m-1">Cancel</button>
                </Link>
            </form>
        </>
    )
}