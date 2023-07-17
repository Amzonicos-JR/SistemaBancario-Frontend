import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import "./TableProfile.scss";
//import { User } from "./User";
export const TableProfile = () => {
  const [iAccount, setIDAccount] = useState();
  const [user, setUser] = useState({});
  const { _id } = useParams();
  const headers = {
    "Content-Type": "application/json",
    Authorization: localStorage.getItem("token"),
  };

  const getUser = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:3000/user/getProfile",
        { headers: headers }
      );
      console.log(data);
      if (data.user) {
        setUser(data.user);
        console.log("esto es la data de user name" + " " + user.name);
      }
    } catch (err) {
      console.log(err);
      throw new Error(err.response.message || data, "Error getting users");
    }
  };

  const deleteUser = async (id) => {
    try {
      let confirmDelete = confirm("Are you sure to delete this account?");
      if (confirmDelete) {
        const { data } = await axios.delete(
          `http://localhost:3000/user/delete/${_id}`,
          { headers: headers }
        );
        getUser();
        alert(`${data.message}`);
      }
    } catch (err) {
      console.error(err);
    }
  };



  useEffect(() => {
    getUser();
  }, []);

  return (
    <>

      <div class="wrapper">
        <div class="profile-card js-profile-card">
          <div class="profile-card__img">
            <img
              src="https://cdn-icons-png.flaticon.com/512/6073/6073873.png"
              alt="profile card"
            />
          </div>

          <div class="profile-card__cnt js-profile-cnt">
            <div class="profile-card__name">
              {user.name} {user.surname}
            </div>
            <div class="profile-card__txt">
              Username: <strong>{user.username}</strong>
            </div>
            <div class="profile-card-loc">
              <span class="profile-card-loc__txt">DPI: {user.DPI}</span>
            </div>

            <div class="profile-card-inf">
              <div class="profile-card-inf__item">
                <div class="profile-card-inf__title">{user.noCuenta}</div>
                <div class="profile-card-inf__txt">No. Cuenta</div>
              </div>
              <div class="profile-card-inf__item">
                <div class="profile-card-inf__title">
                  Q.{user.ingresosMensuales}
                </div>
                <div class="profile-card-inf__txt">Ingresos</div>
              </div>

              <div class="profile-card-inf__item">
                <div class="profile-card-inf__title">Q.{user.balance}</div>
                <div class="profile-card-inf__txt">Balance</div>
              </div>
            </div>

            <div className="profile-card-ctr">
              <Link to='/dash/profile/edit'>
                <button class="profile-card__button button--blue m-2">
                  Change Password
                </button>
              </Link>

              <Link to='/dash/profile/history'>
                <button class="profile-card__button button--orange m-2">
                  History
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
