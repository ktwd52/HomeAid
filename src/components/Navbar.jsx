import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";

const Navbar = ({ links, showLogout = false }) => {
  const { logout } = useContext(AuthContext);
  return (
    <nav className="text-primary-content bg-yellow-200">
      {/* <div className="max-w-[60rem] m-auto flex justify-between items-center flex flex justify-between">  */}
      <div className=" items-center flex justify-around  py-2 ">
        <div className="flex items-left">
          <figure className="flex bg-local">
            <img
              className="bg-local hover:animate-spin"
              src="\img\HomeAid-logo2.JPG"
              alt="The head and torso of a dinosaur skeleton;
            it has a large head with long sharp teeth"
              width="64"
              height="34"
            />

            <figcaption>
              {/* A T-Rex on display in the Manchester University Museum. */}
            </figcaption>
          </figure>
        </div>
        {/* <figure className="md:flex bg-slate-100 rounded-xl p-8 md:p-0 dark:bg-slate-800">
  <img class="w-24 h-24 md:w-48 md:h-auto md:rounded-none rounded-full mx-auto" src="/sarah-dayan.jpg" alt="" width="384" height="512">
  <div class="pt-6 md:p-8 text-center md:text-left space-y-4">
    <blockquote>
      <p class="text-lg font-medium">
        “Tailwind CSS is the only framework that I've seen scale
        on large teams. It’s easy to customize, adapts to any design,
        and the build size is tiny.”
      </p>
    </blockquote>
    <figcaption class="font-medium">
      <div class="text-sky-500 dark:text-sky-400">
        Sarah Dayan
      </div>
      <div class="text-slate-700 dark:text-slate-500">
        Staff Engineer, Algolia
      </div>
    </figcaption>
  </div>
</figure> */}
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
