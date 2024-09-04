import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ENVConfig from "../Utils/env.config";
import { toast } from "react-toastify";

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
        toast.error("login failed!");
      });
  };

  const signup = (data) => {
    axios
      .post(`${ENVConfig.API_ServerURL}/auth/signup`, data)
      .then((res) => {
        toast.success("Sign up successful!");
        // TODO: Do not save User details,
        // communicate to the User to log in
        navigate("/login");
      })
      // .catch(console.log);
      .catch((err) => {
        toast.error("Signup failed!");
      });
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

  const postRequest = (data) => {
    axios
      .post(`${ENVConfig.API_ServerURL}/requests`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        toast.success("Request sent!");
        navigate("/app/user-dashboard");
      })

      .catch((error) => {
        toast.error("Request not sent!");
      });

    console.log(data);
  };

  const updateprofile = (data) => {
    axios
      .put(`${ENVConfig.API_ServerURL}/auth/profile`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        // Handle the successful response here
        if (res.data) {
          console.log("Update Profile : ", res.data);
          setProfile(res.data);
        }
      })
      .catch((error) => {
        // Handle the error here
        console.log(error);
      });
  };

  // logout set isLoggedin to false and delete token and user from IntStorage

  const logout = () => {
    // Get the user ID from localStorage
    const { _id } = JSON.parse(localStorage.getItem("user"));

    // Create a body object to send in the request
    const body = { _id };

    // Remove user and token from localStorage
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    // Send a logout request to the server
    axios
      .post(`${ENVConfig.API_ServerURL}/auth/logout`, body)
      .then((res) => {
        if (res.status === 200) {
          // If logout is successful, log the message and clear the user state
          console.log("Logout successful");
          setUser(null); // Assuming setUser is a state setter function
        }
      })
      .catch((error) => {
        // Handle any errors that occur during the request
        console.log(error);
        setUser(null);
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
        postRequest,
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
