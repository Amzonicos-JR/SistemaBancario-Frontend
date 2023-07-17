import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export const TransferF = () => {
    const navigate = useNavigate()
    const { _id } = useParams();
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
    }

    const addTransferF = async (e) => {
        try {
            e.preventDefault();
            let transfer = {
                amount: document.getElementById('inputA').value
            }
            const { data } = await axios.post(`http://localhost:3000/transfer/transferF/${_id}`, transfer, { headers: headers})
            alert(`${data.message}`)
            clear();
            navigate('/dash/transfer')
        } catch (err) {
            alert(err.response.data.message)
        }
    }

    const clear = async () => {
        try {
            document.getElementById('inputA').value = ''
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <>
            <h1 className="text-center">New Transfer</h1>
            <form className="m-5 text-center">
                <div className="mb-3">
                    <label htmlFor="inputA" className="form-label">Amount to be deposited</label>
                    <input type="number" className="form-control" id="inputA" placeholder="Introduzca el monto a depositar" required />
                </div>
                <br></br>

                <button onClick={(e) => addTransferF(e)} className="btn btn-success m-1">ADD</button>

                <Link to="/dash/favorite">
                    <button className="btn btn-danger m-1">Cancel</button>
                </Link>
            </form>
        </>
    )
}
