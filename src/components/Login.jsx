/* const Login = () => {
  return <p> Login Page</p>;
};

export default Login; */
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
          <div className="flex flex-col w-96 bg-amber-200 shadow-lg px-5 py-4 my-36">
            <h3 className="text-center py-6 text-lg">Sign in to your account</h3>
            <label htmlFor="email" className="text-xs font-mono">Email Address</label>
            <input
              type="text"
              {...register("email", { required: true })}
              placeholder="Email"
              className="p-2 mb-2 bg-amber-100"
            />
            <label htmlFor="email" className="text-xs font-mono">Password</label>
            <input
              type="password"
              {...register("password", { required: true })}
              placeholder="Password"
              className="p-2 mb-2 bg-amber-100"
            />
            <input type="submit" value="Login" className="py-3 mt-4 mb-3 text-white bg-amber-600" />
          </div>
        </form>
      )}
    </>
  );
}
