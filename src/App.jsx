import { useContext } from "react";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  useRouteError,
  Outlet,
  useNavigate,
  Link,
  NavLink,
} from "react-router-dom";
// import "./App.css";
import Home from "./components/Home";
import Requests from "./components/Requests";
import UserDashboard from "./components/UserDashboard";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Protected from "./components/Protected";
import Footer from "./components/Footer";
// import Contact from "./components/Contact";
import AuthProvider from "./context/AuthProvider";
import Navbar from "./components/Navbar";
import Profile from "./components/Profile.jsx";
import AdminDashboard from "./components/AdminDashboard";

const publicLinks = [
  { name: "Home", value: "/" },
  { name: "Login", value: "/login" },
  { name: "Sign Up", value: "/signup" },
];

const protectedLinks = [
  { name: "Home", value: "/app/" },
  { name: "+ Add new request", value: "/app/requests" },
  { name: "User Dashboard", value: "/app/user-dashboard" },
  // { name: "Admin Dashboard", value: "/app/admin-dashboard" },
  // { name: "My Profile", value: "/app/my-profile" },
];

const PageLayout = ({ links, showLogout }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-lvh">
      <AuthProvider>
        <Navbar links={links} showLogout={showLogout} />
        <div className="flex-grow bg-amber-50">
          <Outlet />
        </div>
      </AuthProvider>
      <Footer />
    </div>
  );
};

const ErrorBoundary = () => {
  let error = useRouteError();
  console.error(error);

  return (
    <>
      <p>Something Went Wrong!!!</p>
      <Link to="/"> Go To Home Page</Link>
    </>
  );
};

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route
          path="/"
          errorElement={<ErrorBoundary />}
          element={<PageLayout links={publicLinks} />}
        >
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
        </Route>
        <Route
          path="/"
          errorElement={<ErrorBoundary />}
          element={<PageLayout links={protectedLinks} showLogout />}
        >
          <Route path="app" element={<Protected />}>
            <Route index element={<Home />} />
            <Route path="requests" element={<Requests />} />
            <Route path="user-dashboard" element={<UserDashboard />} />
            <Route path="admin" element={<AdminDashboard />} />
            <Route path="my-profile" element={<Profile />} />
          </Route>
        </Route>
      </>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
