import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";

import { AuthContext } from "../context/authContext";
import { API_URL } from "../helper/constants";

import "../scss/pages/_login.scss";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [emptyInput, setEmptyInput] = useState(false);
  const [invalidInput, setInvalidInput] = useState(false);
  const { setIsLoggedIn, setUserId, setToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();

    if (!username || !password) {
      setInvalidInput(false);
      setEmptyInput(true);
      return;
    }

    axios
      .post(`${API_URL}admin/login`, {
        username,
        password,
      })
      .then((res) => {
        setUsername("");
        setPassword("");

        Cookies.set("token", res.data.token, {
          expires: new Date(new Date().getTime() + 60 * 60 * 1000),
        });
        setIsLoggedIn(true);
        setUserId(res.data.id);
        setToken(res.data.token);
        navigate("/");
      })
      .catch((err) => {
        if (err.response.status === 500) {
          setEmptyInput(false);
          setInvalidInput(true);
        }
      });
  };

  return (
    <form onSubmit={submitHandler} className="login-container">
      <h1>Login</h1>
      <div className="input-container">
        <input
          type="string"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Passwort"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {emptyInput && (
          <p className="error-msg">Bitte alle Felder ausfüllen.</p>
        )}
        {invalidInput && <p className="error-msg">Ungültige Daten.</p>}
        <input type="submit" value="Login" />
      </div>
    </form>
  );
};

export default Login;
