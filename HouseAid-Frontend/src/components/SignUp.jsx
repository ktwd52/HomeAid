/* const SignUp = () => {
  return <p> SignUp Page</p>;
};

export default SignUp; */
import { useForm } from "react-hook-form";

export default function SignUp() {
  // const { user, login } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // const onSubmit = (data) => login(data);
  const onSubmit = (data) => console.log(data);
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
        <label htmlFor="firstName">
          First Name:
          <input
            type="text"
            {...register("firstName", { required: true })}
            placeholder="firstName"
          />
        </label>{" "}
        <label htmlFor="lastName">
          Last Name :
          <input
            type="text"
            {...register("lastName", { required: true })}
            placeholder="lastName"
          />
        </label>
        <label htmlFor="phone">
          Phone:
          <input
            type="tel"
            {...register("phone", { required: true })}
            placeholder="phone"
          />
        </label>
        <label htmlFor="address">
          Address:
          <input
            type="text"
            {...register("address", { required: true })}
            placeholder="address"
          />
        </label>
        <label htmlFor="city">
          City:
          <input
            type="text"
            {...register("city", { required: true })}
            placeholder="city"
          />
        </label>{" "}
        <label htmlFor="postalCode">
          PostalCode:
          <input
            type="number"
            {...register("postalCode", { required: true })}
            placeholder="postalCode"
          />
        </label>
        <label htmlFor="country">
          Country:
          <input
            type="text"
            {...register("country", { required: true })}
            placeholder="country"
          />
        </label>
        <label htmlFor="email">
          Email:
          <input
            type="email"
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
        {/* <input type="submit" /> */}
        <fieldset>
          <legend>Choose your Account type</legend>
          <input type="radio" id="admin" name="accounttype" value="admin" />
          <label for="admin">Admin</label>
          <br />
          <input type="radio" id="user" name="accounttype" value="user" />
          <label for="user">User</label>
          <br />
          {/*           <input type="radio" id="mothman" name="accounttype" value="M" />
          <label for="mothman">Mothman</label> */}

          <label for="avatar">Choose a profile picture:</label>
          <input
            type="file"
            id="profile"
            name="profile"
            accept="image/png, image/jpeg"
          />
        </fieldset>
        <input
          className="rounded-s-none p-2 max-w-sm mx-auto   border-none bg-yellow-200"
          type="button"
          value="SignUp"
        />
      </form>
    </>
  );
}
