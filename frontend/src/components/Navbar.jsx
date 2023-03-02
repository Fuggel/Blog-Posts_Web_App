import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import Cookies from "js-cookie";

import { AuthContext } from "../context/authContext";

import "../scss/components/_navbar.scss";

const Navbar = () => {
  const { isLoggedIn, setIsLoggedIn, setToken } = useContext(AuthContext);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setToken(null);
    Cookies.remove("token");
  };

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        <img src="assets/logo.svg" alt="logo" />
      </Link>
      <ul>
        {!isLoggedIn && (
          <li>
            <NavLink to="/login" className="nav-link">
              Login
            </NavLink>
          </li>
        )}
        {isLoggedIn && (
          <li>
            <NavLink to="/blog" className="nav-link">
              Neuer Blog
            </NavLink>
          </li>
        )}
        {isLoggedIn && (
          <li>
            <Link onClick={handleLogout} className="nav-link logout" to="/">
              Logout
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
