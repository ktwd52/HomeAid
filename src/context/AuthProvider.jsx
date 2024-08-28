import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  console.log("AuthProvider", user, profile);

  const login = (data) => {
    /*     console.log(data);
    setUser(true);
    console.log(user); */

    axios
      // .post("https://homeaid-app-api.onrender.com/auth/login", data)
      .post("http://localhost:8080/auth/login", data)
      .then((res) => {
        setUser(res.data.user);
        localStorage.setItem("token", res.data.token);
      })
      .catch((err) => {
        localStorage.removeItem("token");
      });
    // navigate("/user-dashboard");
  };

  const signup = (data) => {
    axios
      .post("http://localhost:8080/auth/signup", data)
      // .post("https://homeaid-app-api.onrender.com/auth/signup", data)
      .then((res) => {
        // TODO: Do not save User details,
        // communicate to the User to log in
        navigate("/login"); /* 
        setUser(res.data.user);
        localStorage.setItem("token", res.data.token); */
      })
      .catch(console.log);
    console.log(data);
  };

  const getProfile = () =>
    axios
      .get("http://localhost:8080/auth/profile", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        if (res.data) {
          console.log(res.data);
          setProfile(res.data);
        }
      })
      .catch(console.log);

  const updateprofile = (data) => {
    axios
      // .post("https://homeaid-app-api.onrender.com//auth/myprofile", data)
      .put("http://localhost:8080/auth/profile", data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log("Update Profile : ", res.data);
        // setProfile(profile);
      })
      .catch(console.log);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };
  // updateprofile;
  useEffect(() => {
    /* axios
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
      }); */
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        setProfile,
        loading,
        login,
        logout,
        signup,
        getProfile,
        updateprofile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
