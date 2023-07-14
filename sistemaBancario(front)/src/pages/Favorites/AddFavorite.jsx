import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../Index";

export const AddFavorite = () => {
    const { id } = useContext(AuthContext);
    const navigate = useNavigate()
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
    }

    const addFavorite= async (e) => {
        try {
            e.preventDefault();
            let favorite = {
                apodo: document.getElementById('inputApodo').value,
                DPI: document.getElementById('inputDPI').value,
                noCuenta: document.getElementById('inputNoCuenta').value,
                user: localStorage.getItem('_id')
            }
            console.log(headers, '2')
            const { data } = await axios.post('http://localhost:3000/favorite/add', favorite, {headers: headers})
            console.log(data)
            resetAdd()
            navigate('/dash/favorite')
        } catch (err) {
            console.error(err)
            throw new Error("Error to saved favorite")
        }
    }


    const resetAdd = async () => {
        try {
            document.getElementById('inputUser').value = '',
                document.getElementById('inputApodo').value = '',
                document.getElementById('inputDPI').value = '',
                document.getElementById('inputNoCuenta').value = ''
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <h1 className="text-center">Agregar Favorites</h1>
            <form className="m-5 text-center">
                {/* <div className="mb-3">
                    <label htmlFor="inputUser" className="form-label">User</label>
                    <input type="Number" className="form-control" id="inputUser" required />
                </div> */}
                <div className="mb-3">
                    <label htmlFor="inputApodo" className="form-label">Apodo</label>
                    <input type="text" className="form-control" id="inputApodo" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="inputDPI" className="form-label">DPI</label>
                    <input type="text" className="form-control" id="inputDPI" required />
                </div>
                <div>
                    <label htmlFor="inputNoCuenta" className="form-label">NoCuenta</label>
                    <input type="Number" className="form-control" id="inputNoCuenta" required />
                </div>
                <br></br>

                <button onClick={(e) => addFavorite(e)} className="btn btn-success m-1">ADD</button>

                <Link to="/dash/favorite">
                    <button className="btn btn-danger m-1">Cancel</button>
                </Link>
            </form>
        </>
    )
}
