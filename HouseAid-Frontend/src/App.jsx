import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Outlet,
  RouterProvider,
  useNavigate,
  Link,
  useRouteError,
} from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Requests from "./components/Requests";
import UserDashboard from "./components/UserDashboard";

import Login from "./components/Login";
import SignUp from "./components/SignUp";
/* import About from "./components/About";
import Contact from "./components/Contact"; */
import Navbar from "./components/Navbar";

const PageLayout = () => {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <Outlet />
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
        <Route path="userdashboard" element={<UserDashboard />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
      </Route>
      // </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
