import React from 'react'
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Loan } from './loan';

const TableLoan = () => {

    const [loans, setLoans] = useState([{}]);

    const getLoans = async () => {
        try {
            const { data } = await axios('http://localhost:3000/loan/get')
            if (data.loans) {
                setLoans(data.loans)
            }
        } catch (err) {
            console.log(err);
            throw new Error(err.response.message || data, "Error getting loans");
        }

        
        const resetAdd = async () => {
            try {
                document.getElementById('inputDPI').value = '',
                document.getElementById('inputCuenta').value = '',
                document.getElementById('inputAmount').value = '',
                document.getElementById('inputDuration').value = ''
            } catch (error) {
                console.log(error)
            }
        }
    }
    
    const addLoan = async () => {
        try {
            let formData = {
                DPI: document.getElementById('inputDPI').value,
                noCuenta: document.getElementById('inputCuenta').value,
                amount: document.getElementById('inputAmount').value,
                durationMonths: document.getElementById('inputDuration').value
            }
            const { data } = await axios.post('http://localhost:3000/loan/add', formData)
            getLoans()
            alert(data.message)
            resetAdd()
        } catch (error) {                
            console.log(error)
            throw new Error(err.response.message || data, "Error add services");
        }
    }
    useEffect(() => getLoans, [])

    return (
        <>
            <br />
            <h1 className="text-center">Welcome Loans</h1> <br />
            <div style={{ textAlign: "center" }}>
                <button data-bs-toggle="modal" data-bs-target="#exampleModal" type="button" className="btn btn-outline-success">Request</button>
            </div><br />
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Request loan</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">

                            <form action="">
                                <label htmlFor="inputDPI" className="form-label">DPI:</label>
                                <input placeholder="Enter name" type="Number" className="form-control" id="inputDPI" required />
                                <br />
                                <label htmlFor="inputCuenta" className="form-label">No. Cuenta:</label>
                                <input placeholder="Enter description" type="Number" className="form-control" id="inputCuenta" required />
                                <br />
                                <label htmlFor="inputAmount" className="form-label">Amount:</label>
                                <input placeholder="Enter price" type="Number" className="form-control" id="inputAmount" required />
                                <br />
                                <label htmlFor="inputDuration" className="form-label">Duration Months:</label>
                                <input placeholder="Enter price" type="Number" className="form-control" id="inputDuration" required />
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button onClick={() => addLoan()} type="button" className="btn btn-primary" data-bs-dismiss="modal">Add</button>
                        </div>
                    </div>
                </div>
            </div>
            <table className="table table-hover ">
                <thead>
                    <tr className="text-center">
                        <th>DPI</th>
                        <th>No. Cuenta</th>
                        <th>Amount</th>
                        <th>Interest Rate</th>
                        <th>Duration Months</th>
                        <th>Monthly Fee</th>
                        <th>Total Pay</th>                        
                    </tr>
                </thead>
                <tbody>
                    {
                        loans.map(({ _id, DPI, noCuenta, amount, interestRate, durationMonths, monthlyFee, totalPay }, index) => {                 

                            return (
                                <tr className="text-center" key={index}>
                                    <Loan
                                        DPI={DPI}
                                        noCuenta={noCuenta}
                                        amount={amount}
                                        interestRate={interestRate}
                                        durationMonths={durationMonths}
                                        monthlyFee={monthlyFee}
                                        totalPay={totalPay}
                                    ></Loan>                                    
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </>
    )
}

export default TableLoan
