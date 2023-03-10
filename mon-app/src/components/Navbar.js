import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContextProvider";
export default function Navbar() {
  const { user, logout } = useContext(AppContext);
  const navigate = useNavigate();
  function userLogout() {
    logout();
    navigate("/");
  }
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          Navigation
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/" className="nav-link active">
                Accueil
              </Link>
            </li>
            {user.nom ? (
              <li className="nav-item">
                <button
                  onClick={userLogout}
                  className="nav-link active btn btn-link"
                >
                  Deconnexion
                </button>
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <Link to="/register" className="nav-link active">
                    S'enregistrer
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/login" className="nav-link active">
                    Connexion
                  </Link>
                </li>
              </>
            )}
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Selection
              </a>
              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item" href="#">
                    Action
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Another action
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Something else here
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
