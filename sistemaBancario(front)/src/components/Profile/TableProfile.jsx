import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import './TableProfile.scss'
//import { User } from "./User";
export const TableProfile = () => {
  const [iAccount, setIDAccount] = useState();
  const [user, setUser] = useState([]);
  const { _id } = useParams();
  const headers = {
    "Content-Type": "application/json",
    Authorization: localStorage.getItem("token"),
  };

  const getUser = async () => {
    try {
      const data  = await axios.get(
        'http://localhost:3000/user/getProfile',
        { headers: headers }
      );
      console.log(data);
      if (data.user) {
        setUser(data.user);
        
      } 
      console.log(user)
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
      <img src="https://res.cloudinary.com/muhammederdem/image/upload/v1537638518/Ba%C5%9Fl%C4%B1ks%C4%B1z-1.jpg" alt="profile card"/>
    </div>

    <div class="profile-card__cnt js-profile-cnt">
      <div class="profile-card__name">DEBERIA DE IR EL NOMBRE DEL USUARIO{}</div>
      <div class="profile-card__txt">Front-end Developer from <strong>Mesopotamia</strong></div>
      <div class="profile-card-loc">
        <span class="profile-card-loc__icon">
          <svg class="icon"><use xlink:href="#icon-location"></use></svg>
        </span>

        <span class="profile-card-loc__txt">
          Istanbul, Turkey
        </span>
      </div>

      <div class="profile-card-inf">
        <div class="profile-card-inf__item">
          <div class="profile-card-inf__title">1598</div>
          <div class="profile-card-inf__txt">Followers</div>
        </div>

        <div class="profile-card-inf__item">
          <div class="profile-card-inf__title">65</div>
          <div class="profile-card-inf__txt">Following</div>
        </div>

        <div class="profile-card-inf__item">
          <div class="profile-card-inf__title">123</div>
          <div class="profile-card-inf__txt">Articles</div>
        </div>

        <div class="profile-card-inf__item">
          <div class="profile-card-inf__title">85</div>
          <div class="profile-card-inf__txt">Works</div>
        </div>
      </div>

      
      <div class="profile-card-ctr">
        <button class="profile-card__button button--blue js-message-btn">Message</button>
      </div>
    </div>

    <div class="profile-card-message js-message">
      <form class="profile-card-form">
        <div class="profile-card-form__container">
          <textarea placeholder="Say something..."></textarea>
        </div>

        <div class="profile-card-form__bottom">
          <button class="profile-card__button button--blue js-message-close">
            Send
          </button>

          <button class="profile-card__button button--gray js-message-close">
            Cancel
          </button>
        </div>
      </form>

      <div class="profile-card__overlay js-message-close"></div>
    </div>

  </div>

</div>


    </>
  );
};
