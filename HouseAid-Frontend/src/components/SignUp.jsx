/* const SignUp = () => {
  return <p> SignUp Page</p>;
};

export default SignUp; */
import { useForm } from "react-hook-form";
import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
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
      alert("Passwords don't match");
    } else {
      console.log(data); // make API call
      signup(data);
    }
  };
  return (
    <>
      {/*       {user ? (
        <Navigate to="/" />
      ) : ( */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid bg-orange-400 py-16 gap-y-4 px-8"
      >
        <h1>SignUp</h1>
        <fieldset>
          <legend>
            Create your Account <br /> <br />
            <label htmlFor="firstName">
              FirstName:
              <input
                type="text"
                {...register("firstName", { required: true })}
                placeholder="firstName"
              />
              <br /> <br />
            </label>
            <label htmlFor="lastName">
              LastName:
              <input
                type="text"
                {...register("lastName", { required: true })}
                placeholder="lastName"
              />
            </label>
            <br /> <br />
            <label htmlFor="phone">
              Phone:
              <input
                type="tel"
                {...register("phone", { required: true })}
                placeholder="phone"
              />
            </label>
            <br /> <br />
            <div>
              <label htmlFor="address">
                Address:
                <input
                  type="tel"
                  {...register("address", { required: true })}
                  placeholder="address"
                />
              </label>
              <br /> <br />
            </div>
            <label htmlFor="city">
              City:
              <input
                type="text"
                {...register("city", { required: true })}
                placeholder="city"
              />
            </label>
            <br /> <br />
            <label htmlFor="postalCode">
              PostalCode:
              <input
                type="number"
                {...register("postalCode", { required: true })}
                placeholder="postalCode"
              />
            </label>
            <br /> <br />
            <label htmlFor="country">
              Country:
              <input
                type="text"
                {...register("country", { required: true })}
                placeholder="country"
              />
            </label>
            <br /> <br />
            <label htmlFor="email">
              Email:
              <input
                type="email"
                {...register("email", { required: true })}
                placeholder="email"
              />
            </label>
            <br /> <br />
            <label htmlFor="password">
              Password:
              <input
                type="password"
                {...register("password", { required: true })}
                onChange={(e) =>
                  setPassword((prev) => {
                    prev = e.target.value;
                  })
                }
                placeholder="password"
              />
            </label>{" "}
            <br /> <br />
            <label htmlFor="retypepassword">
              Retype Password:
              <input
                type="password"
                {...register("retypepassword", { required: true })}
                onChange={(e) =>
                  setconfirmPassword((prev) => {
                    prev = e.target.value;
                  })
                }
                placeholder="retypepassword"
              />
            </label>
            <br /> <br />
            <label htmlFor="accounttype">Choose your Account type</label> <br />
            <input type="radio" id="admin" name="accounttype" value="admin" />
            <label htmlFor="admin">Admin</label>
            <br />
            <input type="radio" id="user" name="accounttype" value="user" />
            <label htmlFor="user">User</label> <br /> <br />
            <label htmlFor="avatar">
              Choose a profile picture:
              <input
                type="file"
                id="profile"
                name="profile"
                accept="image/png, image/jpeg"
              />
            </label>
            <br /> <br />
            <input
              className="rounded-s-none p-2 max-w-sm mx-auto border-none bg-yellow-200"
              type="submit"
              value="SignUp"
            />
          </legend>
        </fieldset>
      </form>
    </>
  );
}
