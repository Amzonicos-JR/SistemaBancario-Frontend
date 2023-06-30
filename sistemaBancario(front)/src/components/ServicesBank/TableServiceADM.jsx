import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { Services } from "./ServicesBank";
import { AuthContext } from "../../Index";

export const TableServiceADM = () => {
    const { id } = useContext(AuthContext);
    const [idService, setIdService] = useState();
    const [services, setServices] = useState([{}]);

    const getServices = async () => {
        try {
            const { data } = await axios('http://localhost:3000/serviceBank/get')
            if (data.services) {
                setServices(data.services)
            }
        } catch (err) {
            console.log(err);
            throw new Error(err.response.message || data, "Error getting services");
        }
    }

    const addService = async () => {
        try {
            let formData = {
                name: document.getElementById('inputName').value,
                description: document.getElementById('inputDescription').value,
                price: document.getElementById('inputPrice').value
            }
            const { data } = await axios.post('http://localhost:3000/serviceBank/add', formData)
            alert(data.message)
            resetAdd()
            getServices()
        } catch (error) {
            console.log(error)
            throw new Error(err.response.message || data, "Error add services");
        }
    }

    const deleteService = async (idService) => {
        try {
            let confirmDelete = confirm('Are you sure to delete this service?')
            if (confirmDelete) {
                setIdService(idService)
                const { data } = await axios.delete(`http://localhost:3000/serviceBank/delete/${idService}`)
                getServices()
                alert(data.message)
            }
        } catch (err) {
            console.error(err)
        }
    }

    const resetAdd = async () => {
        try {
            document.getElementById('inputName').value = '',
                document.getElementById('inputDescription').value = '',
                document.getElementById('inputPrice').value = ''
        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => getServices, [])
    return (
        <>
            <br />
            <h1 className="text-center">Welcome Services</h1> <br />
            <div style={{ textAlign: "center" }}>
                <button data-bs-toggle="modal" data-bs-target="#exampleModal" type="button" class="btn btn-outline-success">Add</button>
            </div><br />
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Add Service</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">

                            <form action="">
                                <label htmlFor="inputName" className="form-label">Name:</label>
                                <input placeholder="Enter name" type="text" className="form-control" id="inputName" required />
                                <br />
                                <label htmlFor="inputDescription" className="form-label">Description:</label>
                                <input placeholder="Enter description" type="text" className="form-control" id="inputDescription" required />
                                <br />
                                <label htmlFor="inputPrice" className="form-label">Price:</label>
                                <input placeholder="Enter price" type="Number" className="form-control" id="inputPrice" required />
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button onClick={() => addService()} type="button" class="btn btn-primary" data-bs-dismiss="modal">Add</button>
                        </div>
                    </div>
                </div>
            </div>
            <table className="table table-hover ">
                <thead>
                    <tr className="text-center">
                        <th>Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        services.map(({ _id, name, description, price }, index) => {

                            const viewUpdate = async (idService) => {
                                try {
                                    setIdService(idService)
                                    document.getElementById('inputName2').defaultValue = name
                                    document.getElementById('inputDescription2').defaultValue = description
                                    document.getElementById('inputPrice2').defaultValue = price
                                } catch (error) {
                                    console.log(error)
                                }
                            }

                            const updateService = async () => {
                                try {
                                    let formUpdate = {
                                        name: document.getElementById('inputName2').value,
                                        description: document.getElementById('inputDescription2').value,
                                        price: document.getElementById('inputPrice2').value,
                                    }
                                    const { data } = await axios.put(`http://localhost:3000/serviceBank/update/${idService}`, formUpdate)
                                    alert('Updated Sucessfully')
                                    getServices()
                                } catch (err) {
                                    console.error(err)
                                }
                            }

                            return (
                                <tr className="text-center" key={index}>
                                    <Services
                                        name={name}
                                        description={description}
                                        price={price}
                                    ></Services>
                                    <td>
                                        <svg onClick={() => deleteService(_id)} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                                            <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
                                        </svg>ㅤ
                                        <svg onClick={() => viewUpdate(_id)} data-bs-toggle="modal" data-bs-target="#exampleModal2" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
                                            <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                                        </svg>
                                        <div class="modal fade" id="exampleModal2" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                            <div class="modal-dialog">
                                                <div class="modal-content">
                                                    <div class="modal-header">
                                                        <h5 class="modal-title" id="exampleModalLabel">Update Service</h5>
                                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                    </div>
                                                    <div class="modal-body">

                                                        <form action="">
                                                            <label htmlFor="inputName" className="form-label">Name:</label>
                                                            <input placeholder="Enter name" type="text" className="form-control" id="inputName2" />
                                                            <br />
                                                            <label htmlFor="inputDescription" className="form-label">Description:</label>
                                                            <input placeholder="Enter description" type="text" className="form-control" id="inputDescription2" />
                                                            <br />
                                                            <label htmlFor="inputPrice" className="form-label">Price:</label>
                                                            <input placeholder="Enter price" type="Number" className="form-control" id="inputPrice2" />
                                                        </form>
                                                    </div>
                                                    <div class="modal-footer">
                                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                                        <button onClick={() => updateService()} type="button" class="btn btn-primary" data-bs-dismiss="modal">Updated</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
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
