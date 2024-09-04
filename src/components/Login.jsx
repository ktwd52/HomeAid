import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";

export default function Login() {
  const { user, login } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => login(data);
  // const onSubmit = (data) => console.log(data);
  return (
    <>
      {user ? (
        <Navigate to="/app/user-dashboard" />
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-row justify-center bg-amber-50"
        >
          <div className="flex flex-col w-96 bg-amber-200 shadow-lg px-5 py-4 mx-2 my-36">
            <h3 className="text-center py-6 text-lg font-bold text-amber-600">
              Sign in to your account
            </h3>
            <label htmlFor="email" className="text-xs font-mono font-bold text-amber-600">
              Email Address
            </label>
            <input
              type="email"
              {...register("email", { required: true })}
              placeholder="Email"
              className="p-2 mb-2 bg-amber-100 text-amber-600 placeholder:text-amber-600 placeholder:font-light"
            />
            {errors.email?.type === "required" && (
              <p role="alert" className="text-blue-500 pb-2">Email is required...</p>
            )}
            <label htmlFor="email" className="text-xs font-mono font-bold text-amber-600">
              Password
            </label>
            <input
              type="password"
              {...register("password", { required: true })}
              placeholder="Password"
              className="p-2 mb-2 bg-amber-100 text-amber-600 placeholder:text-amber-600 placeholder:font-light"
            />
            {errors.password?.type === "required" && (
              <p role="alert" className="text-blue-500 pb-2">Password is required...</p>
            )}
            <input
              type="submit"
              value="Login"
              className="py-3 mt-4 mb-3 text-white bg-amber-600 shadow-md hover:cursor-pointer hover:shadow-xl"
            />
          </div>
        </form>
      )}
    </>
  );
}
