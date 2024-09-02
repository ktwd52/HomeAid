import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";

const Navbar = ({ links, showLogout = false }) => {
  const { logout } = useContext(AuthContext);
  return (
    <nav className="text-primary-content bg-yellow-200">
      {/* <div className="max-w-[60rem] m-auto flex justify-between items-center flex flex justify-between">  */}
      <div className=" items-center flex justify-between py-2 ">
        <div className="flex flex-row items-center px-8">
          <img
            className="mr-8"
            src="\img\HomeAid-logo2.JPG"
            alt="The head and torso of a dinosaur skeleton;
          it has a large head with long sharp teeth"
            width="100"
            height="100"
          />
          <h1 className="text-5xl font-sans tracking-widest text-amber-600 drop-shadow-lg">HomeAid</h1>
        </div>
        <div className="flex flex-row ">
          {links.map((link) => (
            <div key={link.value} className="px-6 text-amber-600 font-bold hover:text-amber-800">
              <NavLink to={link.value}>{link.name}</NavLink>
            </div>
          ))}
          {showLogout && (
            <div className="px-6 text-amber-600 font-bold hover:text-amber-800">
              <NavLink onClick={logout}>Logout</NavLink>
            </div>
          )}
        </div>
      </div>
      {/* <NavLink to="/contact">Contact</NavLink> */}
      {/* <NavLink to="/posts">Posts</NavLink> */}
    </nav>
  );
};

export default Navbar;
