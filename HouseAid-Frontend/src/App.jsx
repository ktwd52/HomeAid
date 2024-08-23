import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Outlet,
  RouterProvider,
  useNavigate,
  Link,
  useRouteError,
  NavLink,
} from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Requests from "./components/Requests";
import UserDashboard from "./components/UserDashboard";

import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Protected from "./components/Protected";
/* import About from "./components/About";
import Contact from "./components/Contact"; */
import AuthProvider from "./context/AuthProvider";
import Navbar from "./components/Navbar";

const PageLayout = () => {
  const navigate = useNavigate();

  return (
    <>
      <AuthProvider>
        <Navbar />
        <Outlet />
      </AuthProvider>
      <p className="bg-primary text-primary-content bg-yellow-200">Footer</p>
    </>
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
      <Route path="/" errorElement={<ErrorBoundary />} element={<PageLayout />}>
        <Route index element={<Home />} />
        {/* <Route path="about" element={<About />} /> */}
        {/* <Route path="contact" element={<Contact />} /> */}

        <Route path="requests" element={<Requests />} />
        <Route path="/" element={<Protected />}>
          <Route path="user-dashboard" element={<UserDashboard />} />
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
      </Route>
      // </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
