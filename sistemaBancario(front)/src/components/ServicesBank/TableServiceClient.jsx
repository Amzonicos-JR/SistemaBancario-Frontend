import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { Services } from "./ServicesBank";
import { AuthContext } from "../../Index";

const TableServiceClient = () => {
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

    const buyService = async (idService) => {
        try {
            let confirmBuy = confirm('Do you really want to purchase this service?')
            if (confirmBuy) {
                setIdService(idService);
                let formData = {
                    user: id,
                    service: idService
                }                
                const { data } = await axios.post('http://localhost:3000/purchases/buyService', formData);
                alert(data.message);                     
            }
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => getServices, [])

    return (
        <>
            <br />
            <table className="table table-hover ">
                <thead>
                    <tr className="text-center">
                        <th>Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Buy</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        services.map(({ _id, name, description, price }, index) => {
                            return (
                                <tr className="text-center" key={index}>
                                    <Services
                                        name={name}
                                        description={description}
                                        price={price}
                                    ></Services>
                                    <td>
                                        <svg onClick={() => buyService(_id)} xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-bag-heart" viewBox="0 0 16 16">
                                            <path fill-rule="evenodd" d="M10.5 3.5a2.5 2.5 0 0 0-5 0V4h5v-.5Zm1 0V4H15v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4h3.5v-.5a3.5 3.5 0 1 1 7 0ZM14 14V5H2v9a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1ZM8 7.993c1.664-1.711 5.825 1.283 0 5.132-5.825-3.85-1.664-6.843 0-5.132Z" />
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

export default TableServiceClient
