import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ENVConfig from "../Utils/env.config";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  console.log("AuthProvider", user, profile);

  const login = (data) => {
    axios
      .post(`${ENVConfig.API_ServerURL}/auth/login`, data)
      .then((res) => {
        setUser(res.data.user);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        localStorage.setItem("token", res.data.token);
      })
      .catch((err) => {
        localStorage.removeItem("token");
      });
  };

  const signup = (data) => {
    axios
      .post(`${ENVConfig.API_ServerURL}/auth/signup`, data)
      .then((res) => {
        // TODO: Do not save User details,
        // communicate to the User to log in
        navigate("/login");
      })
      .catch(console.log);
    console.log(data);
  };

  const getProfile = () =>
    axios
      .get(`${ENVConfig.API_ServerURL}/auth/profile`, {
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

  const postRequests = (data) => {
    axios
      .post(`${ENVConfig.API_ServerURL}/requests`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        //navigate("/app/user-dashboard");
      })
      .catch(console.log);
    console.log(data);
  };

  const updateprofile = (data) => {
    axios
      .put(`${ENVConfig.API_ServerURL}/auth/profile`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((resp) => {
        // Handle the successful response here
        console.log("Update Profile : ", res.data);
      })
      .catch((error) => {
        // Handle the error here
        console.log(error);
      });
  };

  // logout set isLoggedin to false and delete token and user from IntStorage

  const logout = () => {
    axios
      .post(
        `${ENVConfig.API_ServerURL}/auth/logout`,
        {},
        {
          // Empty object for data since no data is being sent
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          // Check if the response status is 200 (OK)
          console.log("Logout successful");
          localStorage.removeItem("user");
          localStorage.removeItem("token");
          setUser(null);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // updateprofile;
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setUser(user);
    }

    /* axios
      .get("https://homeaid-app-api.onrender.com/auth/profile", {
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
        postRequests,
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
