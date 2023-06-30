import React, { useState, useContext, useEffect } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../Index'
import bl from '../assets/sb2.png'
import '../Login.css'



export const LoginPage = () => {
  const { loggedIn, setLoggedIn, setDataUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: '',
    password: ''
  })

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const logIn = async (e) => {
    try {
      e.preventDefault()
      const { data } = await axios.post('http://localhost:3000/user/login', form)
      console.log(data.user)
      if (data.message) {
        alert(data.message)
        localStorage.setItem('token', data.token)
        localStorage.setItem('_id', data.userLogged._id)
        localStorage.setItem('role', data.userLogged.role)
        setDataUser(data.userLogged)
        console.log(data, 'data', data.userLogged, 'ulogedd')
        setLoggedIn(true)
        navigate('/dash')
      }
    } catch (err) {
      console.log(err)
      alert(err.response?.data.message)
      throw new Error('Error in login')
    }
  }



  return (
    <>
      <section className="vh-100">
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-6 text-black">

              <div className="px-5 ms-xl-4">
                <br />
                <span className="h1 fw-bold mb-0">Sistema Bancario                                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-airplane" viewBox="0 0 16 16">
                  <path d="M6.428 1.151C6.708.591 7.213 0 8 0s1.292.592 1.572 1.151C9.861 1.73 10 2.431 10 3v3.691l5.17 2.585a1.5 1.5 0 0 1 .83 1.342V12a.5.5 0 0 1-.582.493l-5.507-.918-.375 2.253 1.318 1.318A.5.5 0 0 1 10.5 16h-5a.5.5 0 0 1-.354-.854l1.319-1.318-.376-2.253-5.507.918A.5.5 0 0 1 0 12v-1.382a1.5 1.5 0 0 1 .83-1.342L6 6.691V3c0-.568.14-1.271.428-1.849Zm.894.448C7.111 2.02 7 2.569 7 3v4a.5.5 0 0 1-.276.447l-5.448 2.724a.5.5 0 0 0-.276.447v.792l5.418-.903a.5.5 0 0 1 .575.41l.5 3a.5.5 0 0 1-.14.437L6.708 15h2.586l-.647-.646a.5.5 0 0 1-.14-.436l.5-3a.5.5 0 0 1 .576-.411L15 11.41v-.792a.5.5 0 0 0-.276-.447L9.276 7.447A.5.5 0 0 1 9 7V3c0-.432-.11-.979-.322-1.401C8.458 1.159 8.213 1 8 1c-.213 0-.458.158-.678.599Z" />
                </svg>
                </span>
              </div>
              <div className="d-flex align-items-center h-custom-2 px-5 ms-xl-4 mt-5 pt-5 pt-xl-0 mt-xl-n5">

                <form style={{ width: "23rem" }}>

                  <h3 className="fw-normal mb-3 pb-3" style={{ letterSpacing: "1px" }}>Log in</h3>

                  <div className="form-outline mb-4">
                    <input
                      type="text" id="loginUser" name='username' onChange={handleChange} placeholder='Username' className="form-control form-control-lg" />
                    <label className="form-label" htmlFor="form2Example18">Username</label>
                  </div>

                  <div className="form-outline mb-1">
                    <input
                      type="password" id="LoginPassword" name='password' onChange={handleChange} placeholder='Password'
                      className="form-control form-control-lg" />
                    <label className="form-label" htmlFor="form2Example28">Password</label>
                  </div>

                  <div className="">
                    <button onClick={(e) => logIn(e)} type="button" className="btn btn-outline-dark m-1">Login</button>
                  </div>
                </form>
              </div>

            </div>
            <div className="col-sm-6 px-0 d-none d-sm-block">
              <img src={bl}
                alt="Login image" className="w-100 vh-100" style={{ objectFit: "cover" }} />
            </div>

          </div>
        </div >
      </section >
    </>
  )
}