import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { Transfer } from "./Transfer";
import { AuthContext } from "../../Index"

export const TableTransfer = () => {
    const { id } = useContext(AuthContext)
    const [transfers, setTransfers] = useState([{}]);
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
    }

    const getTransfers = async () => {
        try {
            const { data } = await axios.get(`http://localhost:3000/transfer/getTransfersById`, { headers: headers })
            if (data.transfers) {
                setTransfers(data.transfers)
            }
        } catch (err) {
            console.log(err);
            throw new Error(err.response.message || data, "Error getting transfers");
        }

    };

    const deleteTransfer = async (id) => {
        try {
            let confirmDelete = confirm('Are you sure to reverse the transfer ?')
            const { data } = await axios.put(`http://localhost:3000/transfer/revertirT/${id}`)
            if (confirmDelete) {
                alert(`${data.message}`)
                getTransfers()
            }

        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => getTransfers, [])

    return (
        <>
            <br />
            <table className="table table-striped">
                <thead>
                    <tr className="text-center">
                        {/* ordering party */}
                        <th>DPI OP</th>
                        <th>DPI beneficiary</th>
                        <th>Account No</th>
                        <th>Amounth</th>
                        <th>Date</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        transfers.map(({ _id, DPIO, DPIB, accountNo, amount, date }, index) => {
                            return (
                                <tr className="text-center" key={index}>
                                    <Transfer
                                        DPIO={DPIO}
                                        DPIB={DPIB}
                                        accountNo={accountNo}
                                        amount={amount}
                                        date={date}
                                    ></Transfer>
                                    <td>
                                        <svg onClick={() => deleteTransfer(_id)} xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                                            <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
                                        </svg>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </>
    )
}