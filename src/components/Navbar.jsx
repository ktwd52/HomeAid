import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar, User} from "@nextui-org/react";

const Navbar = ({ links, showLogout = false }) => {
  const { user, profile, logout } = useContext(AuthContext);
  console.log("Navbar", user);
  
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
        <div className="flex flex-row items-center">
          {links.map((link) => (
            <div key={link.value} className="px-6 text-amber-600 font-bold hover:text-amber-800">
              <NavLink to={link.value}>{link.name}</NavLink>
            </div>
          ))}
          {showLogout && (
            <div className="px-6 text-amber-600 font-bold hover:text-amber-800">
              {/* <NavLink onClick={logout}>Logout</NavLink> */}
              <Dropdown placement="bottom-start">
                <DropdownTrigger>
                  <User
                    as="button"
                     avatarProps={{
                       isBordered: true,
                    //   src: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
                     }}
                    className="transition-transform"
                    description={`@${profile?.username}`}
                    name={profile ? `${profile.firstname} ${profile.lastname}` : ''}
                  />
                </DropdownTrigger>
                <DropdownMenu aria-label="User Actions" variant="flat">
                  <DropdownItem key="logout" color="danger" onClick={logout}>
                    Log Out
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
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
