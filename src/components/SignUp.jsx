import { useForm } from "react-hook-form";
import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { toast } from "react-toastify";
// import AuthProvider from "./context/AuthProvider";
export default function SignUp() {
  const { user, login, signup } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  // const onSubmit = (data) => login(data);
  const onSubmit = (data) => {
    // console.log(data.password); // make API call
    // console.log(data.retypepassword); // make API call// perform all neccassary validations
    if (data.password !== data.retypepassword) {
      toast.error("Passwords don't match")
    } else {
      console.log(data); // make API call
      signup(data);
    }
  };
  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-row justify-center bg-amber-50"
      >
        <div className="flex flex-col w-96 bg-amber-200 shadow-lg px-5 py-4 my-36">
          <h3 className=" text-center py-6 text-lg font-bold text-amber-600">Create your Account</h3>
          <label htmlFor="username" className="text-xs font-mono font-bold text-amber-600">Username</label>
          <input
            type="text"
            {...register("username", { required: true })}
            placeholder="Username"
            className="p-2 mb-2 bg-amber-100 text-amber-600 placeholder:text-amber-600 placeholder:font-light"
          />
          {errors.username?.type === "required" && (
              <p role="alert" className="text-blue-500 pb-2">Username is required...</p>
          )}

          <label htmlFor="email" className="text-xs font-mono font-bold text-amber-600">Email</label>
          <input
            type="text"
            {...register("email", { required: true })}
            placeholder="Email"
            className="p-2 mb-2 bg-amber-100 text-amber-600 placeholder:text-amber-600  placeholder:font-light"
          />
          {errors.email?.type === "required" && (
            <p role="alert" className="text-blue-500 pb-2">Email is required...</p>
          )}

          <label htmlFor="password" className="text-xs font-mono font-bold text-amber-600">Password</label>
          <input
            type="password"
            {...register("password", { required: true })}
            onChange={(e) =>
              setPassword((prev) => {
                prev = e.target.value;
              })
            }
            placeholder="Password"
            className="p-2 mb-2 bg-amber-100 text-amber-600 placeholder:text-amber-600  placeholder:font-light"
          />
          {errors.password?.type === "required" && (
            <p role="alert" className="text-blue-500 pb-2">Password is required...</p>
          )}

          <label htmlFor="retypepassword" className="text-xs font-mono font-bold text-amber-600">Retype Password</label>
          <input
            type="password"
            {...register("retypepassword", { required: true })}
            onChange={(e) =>
              setconfirmPassword((prev) => {
                prev = e.target.value;
              })
            }
            placeholder="Retype Password"
            className="p-2 mb-2 bg-amber-100 text-amber-600 placeholder:text-amber-600 placeholder:font-light"
          />
          {errors.retypepassword?.type === "required" && (
            <p role="alert" className="text-blue-500 pb-2">Password is required...</p>
          )}

          <div className="flex flex-row items-start py-3">
            <input
              type="checkbox"
              {...register("isAdmin")}
              id="isAdmin"
              name="isAdmin"
              className="bg-amber-100 mr-3 text-amber-600"
            />
            <label htmlFor="isAdmin"  className="text-xs font-mono font-bold text-amber-600">SignUp as Admin</label>
          </div>
          <input
            className="py-3 mt-4 mb-3 text-white bg-amber-600 shadow-md hover:cursor-pointer hover:shadow-xl"
            type="submit"
            value="Sign up"
          />
        </div>
      </form>
    </>
  );
}
{/* <label htmlFor="admin">Admin</label>
            <br />
            <input
              type="radio"
              {...register("role", { required: true })}
              id="user"
              name="role"
              value="user"
            />
            <label htmlFor="user">User</label> */}
            {/*    <label htmlFor="avatar">
              Choose a profile picture:
              <input
                type="file"
                id="profile"
                name="profile"
                accept="image/png, image/jpeg"
              />
            </label>
          */}