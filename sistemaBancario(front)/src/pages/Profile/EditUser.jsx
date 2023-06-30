import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

export const EditUser = () => {
    const [user, setUser] = useState({});
    const navigate = useNavigate();
    const { _id } = useParams();
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
    }
    const getUser = async () => {
        try {
            const { data } = await axios.get(`http://localhost:3000/user/getProfile`, { headers: headers })
            if (data.user) {
                console.log(data.user, 'xxx')
                setUser(data.user)
            }
        } catch (err) {
            console.log(err);
            throw new Error(err.response.message || data, "Error getting users");
        }

    };

    const updatedPassword = async (e) => {
        try {
            e.preventDefault();
            let updatePassword = {
                password: document.getElementById('inputOldPassword').value,
                newPassword: document.getElementById('inputPassword').value

            }
            const { data } = await axios.put(`http://localhost:3000/user/updatePassword`, updatePassword, {headers: headers})
            getUser();
            alert(`${data.message}`)

            navigate('/dash/profile')
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        getUser();
    }, [])
    return (
        <>
            <h1 className='className="container d-flex justify-content-center align-items-center h-100"'>
                Update Password
            </h1>
            <form className="m-5 text-center">
                <div className="mb-3">
                    <label htmlFor="inpurOldPassword" className="form-label">Password</label>
                    <input type="password" className="form-control" id="inputOldPassword" />
                </div>
                <div>
                    <label htmlFor="inputPassword" className="form-label">New Password</label>
                    <input type="password" className="form-control" id="inputPassword"/>
                </div>
                <br></br>
                <button onClick={(e) => updatedPassword(e)} className="btn btn-success m-1">Update</button>
                <Link to='/dash/profile'>
                    <button className="btn btn-danger m-1">Cancel</button>
                </Link>
            </form>
        </>
    )
}