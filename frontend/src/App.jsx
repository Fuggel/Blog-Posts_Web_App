import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Cookies from "js-cookie";

import { AuthContext } from "./context/authContext";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import AddBlog from "./pages/admin/AddBlog";
import EditBlog from "./pages/admin/EditBlog";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState(Cookies.get("token") ?? null);

  const autoLogout = () => {
    setIsLoggedIn(false);
    setToken(null);
    Cookies.remove("token");
  };

  useEffect(() => {
    if (token) setIsLoggedIn(true);
  }, [token]);

  if (isLoggedIn) setTimeout(() => autoLogout(), 1000 * 60 * 60);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        userId,
        setUserId,
        token,
        setToken,
      }}
    >
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/blog/edit/:id" element={<EditBlog />} />
        <Route path="/blog" element={<AddBlog />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </AuthContext.Provider>
  );
};

export default App;
