/* const Requests = () => {
  return <p> Add new request </p>;
};

export default Requests; */
/* const Login = () => {
  return <p> Login Page</p>;
};

export default Login; */
// import { useContext } from "react";
//  import { AuthContext } from "../context/AuthProvider";
// import { Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";

export default function Requests() {
  // const { user, login } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // const onSubmit = (data) => login(data);
  // const onSubmit = (data) => console.log(data);
  return (
    <>
      {/*       {user ? (
        <Navigate to="/" />
      ) : ( */}{" "}
      <h1 className="flex bg-orange-400 py-16 gap-y-4 px-8">
        Create your Requests
      </h1>
      <form className="flex bg-orange-400 py-1 gap-y-4 px-1 grid-cols-3  justify-items-start">
        <fieldset className="rounded-s-none p-28 max-w-sm mx-auto   grid border-none  bg-lime-200">
          <label htmlFor="titleCategory">
            Title / Category:
            <input
              type="text"
              {...register("titleCategory", { required: true })}
              placeholder="titleCategory"
            />
          </label>
          <br />
          <label htmlFor="requesttext">
            Request text:
            <input
              type="text"
              {...register("requesttext", { required: true })}
              placeholder="Request text:"
              minlength=""
              maxlength="88"
              size="44"
            />
          </label>
          <br />
          <label htmlFor="date">
            Required deadline:
            <input
              type="date"
              {...register("date", { required: true })}
              placeholder="date"
            />
          </label>
          <br />
          <label for="avatar">Choose a Request picture:</label>
          <input
            type="file"
            id="request"
            name="request"
            accept="image/png, image/jpeg"
          />
        </fieldset>
        <input
          className="rounded-s-none p-2  mx-auto h-24  border-x-4 bg-yellow-200"
          type="button"
          value="Send Request"
        />
      </form>
      {/* )} */}
    </>
  );
}
