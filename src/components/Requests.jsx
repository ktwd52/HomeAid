/* const Requests = () => {
  return <p> Add new request </p>;
};

export default Requests; */
/* const Login = () => {
  return <p> Login Page</p>;
};

export default Login; */
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
// import { Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Textarea } from "@nextui-org/input";
import Form_ImageUpload from "./ImageUpload/Form_ImageUpload";

export default function Requests() {
  const { user, postRequests } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // const onSubmit = (data) => login(data);
  const onSubmit = (data) => {
    const dataWithUserId = { ...data, rUserId: user._id };
    // Console log
    console.log(dataWithUserId);
    postRequests(dataWithUserId);
  };

  return (
    <>
      <h1 className="flex bg-orange-400 py-16 gap-y-4 px-8">
        Create your Requests
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex bg-orange-400 py-1 gap-y-4 px-1 grid-cols-3 justify-items-start"
      >
        <fieldset className="rounded-s-none p-28 max-w-sm mx-auto grid border-none bg-lime-200">
          <label htmlFor="titleCategory">
            Title / Category:
            <select {...register("rCategory")}>
              <option value="general">General</option>
              <option value="Carpentor">Carpentor</option>
              <option value="Cooking">Cooking</option>
              <option value="Cleaning">Cleaning</option>
            </select>
          </label>
          <br />
          <Textarea
            {...register("rText", { required: true })}
            isRequired
            maxRows={4}
            label="Request description:"
            labelPlacement="outside"
            placeholder="Please enter your request..."
            className="max-w-xs"
          />
          <br />
          <label htmlFor="date">
            Required deadline:
            <input
              type="date"
              {...register("date", { required: true })}
              defaultValue={
                new Date(new Date().setDate(new Date().getDate() + 7))
                  .toISOString()
                  .split("T")[0]
              }
              min={new Date().toISOString().split("T")[0]} // Set minimum date to today
              placeholder="date"
            />
          </label>
          <br />
          <Form_ImageUpload /> {/* Added the ImageUploadForm component */}
          <input
            className="rounded-s-none p-2 mx-auto h-24 border-x-4 bg-yellow-200"
            type="submit"
            value="Send Request"
          />
        </fieldset>
      </form>
    </>
  );
}
