import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const login = (data) => {
    console.log(data);
    // setUser(true);

    axios
      .post("https://homeaid-app-api.onrender.com/auth/login", data)
      // .post("http://localhost:3000/auth/login", data)
      .then((res) => {
        setUser(res.data.user);
        localStorage.setItem("token", res.data.token);
      })
      .catch((err) => {
        localStorage.removeItem("token");
      });
    navigate("/user-dashboard");
  };

  const signup = (data) => {
    axios
      .post("https://homeaid-app-api.onrender.com/auth/signup", data)
      .then((res) => {
        setUser(res.data.user);
        localStorage.setItem("token", res.data.token);
      })
      .catch(console.log);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  useEffect(() => {
    axios
      .get("https://homeaid-app-api.onrender.com/auth/me", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
        setUser(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
