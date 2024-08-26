/* function Profile() {
  return <>Profile</>;
}

export default Profile; */
import { useForm } from "react-hook-form";
import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
// import AuthProvider from "./context/AuthProvider";
function Profile() {
  const { user, login, signup, updateprofile } = useContext(AuthContext);

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
    /* if (data.password !== data.retypepassword) {
      alert("Passwords don't match");
    } else {
      console.log(data); // make API call
      updateprofile(data);
    } */ console.log(data); // make API call
    updateprofile(data);
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
        <h1>Update your Account</h1> <br />
        <fieldset>
          <legend>
            {/* Create your Account <br /> <br /> */}
            {/* Update your Account <br /> <br /> */}
            <label htmlFor="firstName">
              First Name:
              <input
                type="text"
                {...register("firstName", { required: true })}
                placeholder="firstName"
              />
              <br /> <br />
            </label>
            <label htmlFor="lastName">
              Last Name:
              <input
                type="text"
                {...register("lastName", { required: true })}
                placeholder="last Name"
              />
            </label>{" "}
            <br /> <br />
            <label htmlFor="language">
              Language:
              <input
                type="text"
                {...register("language", { required: true })}
                placeholder="language"
              />
            </label>{" "}
            <br /> <br />
            <label htmlFor="house_number">
              House number:
              <input
                type="text"
                {...register("house_number", { required: true })}
                placeholder="house_number"
              />
            </label>{" "}
            <br /> <br />
            <label htmlFor="road">
              Road:
              <input
                type="text"
                {...register("road", { required: true })}
                placeholder="road"
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
              <label htmlFor="state">
                state:
                <input
                  type="text"
                  {...register("state", {})}
                  placeholder="state"
                />
              </label>
              <br /> <br />
            </div>
            {/*  <br />
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
            </div> */}
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
              Postal Code:
              <input
                type="number"
                {...register("postalCode", {})}
                placeholder="postal Code"
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
            <label htmlFor="isOfferingHelp">
              Offering Help?
              <input
                type="text"
                {...register("isOfferingHelp", { required: true })}
                placeholder="isOffering Help"
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
            <br /> <br />
            {/* <label htmlFor="accounttype">Choose your Account type</label> <br />
            <input type="radio" id="admin" name="accounttype" value="admin" />
            <label htmlFor="admin">Admin</label>
            <br />
            <input type="radio" id="user" name="accounttype" value="user" />
            <label htmlFor="user">User</label> <br /> <br />
             */}
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
              value="Update"
            />
          </legend>
        </fieldset>
      </form>
    </>
  );
}

export default Profile;
