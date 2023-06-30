import React, { useState, useContext } from "react";
import "../DashboardPage/DashBoardStyle.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Index";
import { Outlet, Link } from "react-router-dom";

export const DashboardPage = () => {
  const { isAdmin, setLoggedIn, role } = useContext(AuthContext);
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState(null);

  const [showScene, setShowScene] = useState({
    product: false
  });

  const nav = () => {
    let x = localStorage.getItem('role')
    console.log(x)
    return (
      <>
        {x === "ADMINAM" ? (
          <>
            <li className="nav-item">
              <Link to={"service"} className="nav-link">
                Services<i className="bi bi-star-fill"></i>
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"loan"} className="nav-link">
                Loan<i className="bi bi-star-fill"></i>
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"graphic"} className="nav-link">
                Stats<i className="bi bi-star-fill"></i>
              </Link>
            </li>
            <li onClick={() => logOut()} className="nav-item">
              <Link className="nav-link">
                LogOutAM<i className="bi bi-star-fill"></i>
              </Link>
            </li>
          </>
        ) : x === "ADMIN" ? (
          <>
          </>
        ) : (
          <>
            <li className="nav-item">
              <Link to={"servicesClient"} className="nav-link">
                Services<i className="bi bi-star-fill"></i>
              </Link>
            </li>
            <li onClick={() => logOut()} className="nav-item">
              <Link className="nav-link">
                LogOutClient<i className="bi bi-star-fill"></i>
              </Link>
            </li>
          </>
        )}
      </>
    )
  }

  const logOut = () => {
    localStorage.clear();
    setLoggedIn(false);
    navigate("/login");
  };

  return (
    <>
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
        rel="stylesheet"
        integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
        crossOrigin="anonymous"
      />
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.1/font/bootstrap-icons.css"
      />
      <div>
        {/* <!-- Inicio del menu --> */}
        <nav className="navbar navbar-expand-md navbar-dark bg-dark">
          <div className="container-fluid">
            {/* <!-- icono o nombre --> */}
            <a className="navbar-brand active">
              <i className="bi bi-person-circle"></i>
              <Link to={""}>
                <span className="text-info"> Dashboard</span>
              </Link>
            </a>
            {/* <!-- boton del menu para resolucion movil --> */}
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#menu"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            {/* <!-- elementos del menu responsive --> */}
            <div className="collapse navbar-collapse" id="menu">
              <ul className="navbar-nav me-auto">
                {nav()}
              </ul>
              <hr className="d-md-none text-white-50" />
              {/* <!-- Iconos redes sociales --> */}
              <ul className="navbar-nav  flex-row flex-wrap text-light">
                <li className="nav-item col-6 col-md-auto p-3">
                  <i className="bi bi-twitter"></i>
                  <small className="d-md-none ms-2">Twitter</small>
                </li>
                <li className="nav-item col-6 col-md-auto p-3">
                  <i className="bi bi-github"></i>
                  <small className="d-md-none ms-2">GitHub</small>
                </li>
                <li className="nav-item col-6 col-md-auto p-3">
                  <i className="bi bi-whatsapp"></i>
                  <small className="d-md-none ms-2">WhatsApp</small>
                </li>
                <li className="nav-item col-6 col-md-auto p-3">
                  <i className="bi bi-facebook"></i>
                  <small className="d-md-none ms-2">Facebook</small>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div className="content">{activeView === "user" && <UsersPage />}</div>
        {/* <!-- Script para responsive - movil--> */}
        <script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p"
          crossOrigin="anonymous"
        ></script>
      </div>
      <Outlet></Outlet>
    </>
  );
};
