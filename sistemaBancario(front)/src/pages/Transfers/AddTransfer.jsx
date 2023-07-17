import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export const AddTransfer = () => {
    const navigate = useNavigate()
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
    }
    const addTransfers = async (e) => {
        try {
            e.preventDefault();
            let transfer = {
                DPIB: document.getElementById('inputDPIB').value,
                accountNo: document.getElementById('inputAccountNo').value,
                amount: document.getElementById('inputAmount').value,
            }
            const { data } = await axios.post('http://localhost:3000/transfer/newTransfer', transfer, { headers: headers})
            alert(`${data.message}`)
            clear();
            navigate('/dash/transfer')
        } catch (err) {
            alert(err.response.data.message)
        }
    }

    const clear = async () => {
        try {
            document.getElementById('inputDPIB').value = '',
                document.getElementById('inputAccountNo').value = '',
                document.getElementById('inputAmount').value = ''
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <>
            <h1 className="text-center">ADD TRANSFER</h1>
            <form className="m-5 text-center">
                {/* <div className="mb-3">
                    <label htmlFor="inputNO" className="form-label">DPI OP</label>
                    <input type="number" className="form-control" id="inputNO" required />
                </div> */}
                <div className="mb-3">
                    <label htmlFor="inputDPIB" className="form-label">DPI Beneficiary</label>
                    <input type="number" className="form-control" id="inputDPIB" required />
                </div>
                <div>
                    <label htmlFor="inputAccountNo" className="form-label">Account No</label>
                    <input type="text" className="form-control" id="inputAccountNo" required />
                </div>
                <div>
                    <label htmlFor="inputAmount" className="form-label">Amounth</label>
                    <input type="number" className="form-control" id="inputAmount" required />
                </div>
                <br></br>

                <button onClick={(e) => addTransfers(e)} className="btn btn-success m-1">ADD</button>

                <Link to="/dash/transfer">
                    <button className="btn btn-danger m-1">Cancel</button>
                </Link>
            </form>
        </>
    )
}
