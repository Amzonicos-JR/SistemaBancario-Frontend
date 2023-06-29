import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { User } from "./User";
export const TableUser = () => {

    const [iAccount, setIDAccount] = useState();
    const [users, setUsers] = useState([{}]);
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
    }

    const getUsers = async () => {
        try {
            const { data } = await axios.get('http://localhost:3000/user/getAccounts', {headers: headers})
            console.log(data)
            if (data.users) {
                setUsers(data.users)
            }
        } catch (err) {
            console.log(err);
            throw new Error(err.response.message || data, "Error getting users");
        }

    };


    const deleteUser = async (id) => {
        try {
            let confirmDelete = confirm('Are you sure to delete this account?')
            if (confirmDelete) {
                const { data } = await axios.delete(`http://localhost:3000/user/delete/${id}`, {headers: headers})
                getUsers()
                alert(`${data.message}`)
            }
        } catch (err) {
            console.error(err)
        }
    }

 
    useEffect(() => {
        getUsers();
      }, []);
    
    return (
        <>
            <br />
            <table className="table table-striped">
                <thead>
                    <tr className="text-center">
                        <th>DPI</th>
                        <th>Cuenta</th>
                        <th>Name</th>
                        <th>Surname</th>
                        <th>Email</th>
                        <th>Balance</th>
                        <th>Update</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map(({ _id, DPI, noCuenta, name, surname, email, balance }, index) => {
                            return (
                                <tr className="text-center" key={index}>
                                    <User
                                        DPI={DPI}
                                        noCuenta={noCuenta}
                                        name={name}
                                        surname={surname}
                                        email={email}
                                        balance={balance}
                                    ></User>
                                    <td>
                                        <Link to={`users/updateuser/${_id}`}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                                <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                            </svg>
                                        </Link>
                                    </td>
                                    <td>
                                        <svg onClick={() => deleteUser(_id)} xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-trash3" viewBox="0 0 16 16">
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