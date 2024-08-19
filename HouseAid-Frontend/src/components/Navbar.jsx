import { Link, NavLink } from "react-router-dom";
const Navbar = () => {
  return (
    <nav className="bg-primary text-primary-content bg-yellow-200">
      {/* <div className="mx-auto flex justify-between items-center flex flex justify-between">  */}
      <div className="max-w-[60rem] m-auto flex justify-around items-center py-2 ">
        <div className=" ">
          <NavLink to="/">Home</NavLink>
        </div>
        {/* <NavLink to="/about"> About</NavLink> */}
        <div className=" ">
          <NavLink to="/requests"> + Add new request </NavLink>
        </div>
        <div className=" ">
          <NavLink to="/userdashboard"> UserDashboard</NavLink>
        </div>
        <div className="  ">
          <NavLink to="/login"> Login</NavLink>
        </div>
        <div className="">
          <NavLink to="/signup"> Sign-Up</NavLink>
        </div>{" "}
      </div>
      {/* <NavLink to="/contact">Contact</NavLink> */}
      {/* <NavLink to="/posts">Posts</NavLink> */}
    </nav>
  );
};

export default Navbar;
