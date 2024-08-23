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
          className="grid bg-orange-400 py-16 gap-y-4 px-8"
        >
          <h1>Login</h1>
          <label htmlFor="email">
            Email:
            <input
              type="text"
              {...register("email", { required: true })}
              placeholder="email"
            />
          </label>
          <label htmlFor="email">
            Password:
            <input
              type="password"
              {...register("password", { required: true })}
              placeholder="password"
            />
          </label>
          <input type="submit" value="Login" />
        </form>
      )}
    </>
  );
}
