import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
  User,
} from "@nextui-org/react";

const Navbar = ({ links, showLogout = false }) => {
  const { user, profile, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const adminLink = { name: "Admin Dashboard", value: "/app/admin" };

  console.log("Navbar", user);

  return (
    <nav className="text-primary-content bg-yellow-200">
      {/* <div className="max-w-[60rem] m-auto flex justify-between items-center flex flex justify-between">  */}
      <div className=" items-center flex justify-between">
        <div className="flex flex-row items-center px-8">
          <img
            className="mr-8 hover:animate-spin"
            src={"/public/img/logo/HomeAid-Logo.jpg"}
            alt="Logo of the Application with a Home and tools around it"
            width="100"
            height="100"
          />
          <h1 className="text-5xl font-sans tracking-widest text-amber-600 drop-shadow-lg">
            HomeAid
          </h1>
        </div>
        <div className="flex flex-row items-center">
          {links.map((link) => (
            <div
              key={link.value}
              className="px-6 text-amber-600 font-bold hover:text-amber-800"
            >
              <NavLink to={link.value}>{link.name}</NavLink>
            </div>
          ))}
          {user?.role === "admin" && user?.isAdmin && (
            <div
              key={adminLink.value}
              className="px-6 text-amber-600 font-bold hover:text-amber-800"
            >
              <NavLink to={adminLink.value}>{adminLink.name}</NavLink>
            </div>
          )}
          {showLogout && (
            <div className="px-6 text-amber-600 font-bold hover:text-amber-800">
              <Dropdown placement="bottom-start">
                <DropdownTrigger>
                  <User
                    as="button"
                    avatarProps={{
                      src: profile?.profileimg ? profile.profileimg : "",
                    }}
                    className="transition-transform"
                    description={`@${profile?.username}`}
                    name={
                      profile?.firstname && profile?.lastname
                        ? `${profile.firstname} ${profile.lastname}`
                        : "please update My Profile page"
                    }
                  />
                </DropdownTrigger>
                <DropdownMenu aria-label="User Actions" variant="flat">
                  <DropdownItem
                    key="profile"
                    className="h-14 gap-2"
                    color="warning"
                    onClick={() => navigate("/app/my-profile")}
                  >
                    <p className="">My Profile</p>
                  </DropdownItem>
                  <DropdownItem key="logout" color="warning" onClick={logout}>
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
