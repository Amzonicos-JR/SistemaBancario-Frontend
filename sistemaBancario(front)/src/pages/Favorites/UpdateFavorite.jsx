import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

export const UpdateFavorite = () => {
    const [favorites, setFavorites] = useState([{}]);
    const navigate = useNavigate();
    const { _id } = useParams();
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
    }

    const getFavorites = async (id) => {
        try {
            const { data } = await axios.get(`http://localhost:3000/favorite/get`, { headers: headers });
            console.log(data);
            setFavorites(data.favorites);
        } catch (err) {
            console.log(err);
            throw new Error(err.response.message || data, "Error getting favorites");
        }
    };

    const updateFavorite = async (e) => {
        try {
            e.preventDefault();
            let updateF = {
                apodo: document.getElementById('inputApodo').value
            }
            const { data } = await axios.put(`http://localhost:3000/favorite/update/${_id}`, updateF, { headers: headers })
            alert(`${data.message}`)
            getFavorites();

            navigate('/dash/favorite/')
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        getFavorites();
    }, []);
    return (
        <>
            <h1 className='className="container d-flex justify-content-center align-items-center h-100"'>
                Update Favorite
            </h1>
            <form className="m-5 text-center">
                <div className="mb-3">
                    <label htmlFor="inputApodo" className="form-label">Apodo</label>
                    <input type="text" className="form-control" id="inputApodo" defaultValue={''} placeholder="Introduzca el nuevo apodo" />
                </div>
                <br></br>
                <button onClick={(e) => updateFavorite(e)} className="btn btn-success m-1">Update</button>
                <Link to='/dash/favorite/'>
                    <button className="btn btn-danger m-1">Cancel</button>
                </Link>
            </form>
        </>
    )
}