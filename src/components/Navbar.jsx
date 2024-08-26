import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";

const Navbar = ({ links, showLogout = false }) => {
  const { logout } = useContext(AuthContext);
  return (
    <nav className="bg-primary text-primary-content bg-yellow-200">
      {/* <div className="mx-auto flex justify-between items-center flex flex justify-between">  */}
      <div className="max-w-[60rem] m-auto flex justify-around items-center py-2 ">
        {links.map((link) => (
          <div key={link.value} className="">
            <NavLink to={link.value}>{link.name}</NavLink>
          </div>
        ))}
        {showLogout && (
          <div className="">
            <NavLink onClick={logout}>Logout</NavLink>
          </div>
        )}
      </div>
      {/* <NavLink to="/contact">Contact</NavLink> */}
      {/* <NavLink to="/posts">Posts</NavLink> */}
    </nav>
  );
};

export default Navbar;
