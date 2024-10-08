import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { useForm } from "react-hook-form";

import formatDate from "../Utils/formatDate";

export default function Requests() {
  const { user, postRequest } = useContext(AuthContext);
  const today = new Date().toISOString().split("T")[0];

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const dataWithUserId = { ...data, rUserId: user._id };
    console.log(dataWithUserId);
    postRequest(dataWithUserId);
  };
  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-row justify-center bg-amber-50"
      >
        <div className="flex flex-col w-4/5 max-w-3xl bg-amber-200 shadow-lg px-5 py-4 mt-24 mb-36">
          <h3 className="text-center py-6 text-lg font-bold text-amber-600">
            Create your Request
          </h3>
          <label
            htmlFor="titleCategory"
            className="text-xs font-mono font-bold text-amber-600"
          >
            Category
          </label>
          <select
            {...register("rCategory")}
            className="p-2 mb-2 bg-amber-100 text-amber-600 w-full sm:w-2/3 md:w-1/3"
          >
            <option value="general">General</option>
            <option value="carpenter">Carpenter</option>
            <option value="cooking">Cooking</option>
            <option value="cleaning">Cleaning</option>
            <option value="gardening">Gardening</option>
            <option value="plumbing">Plumbing</option>
          </select>
          <label
            htmlFor="date"
            className="text-xs font-mono mt-2 font-bold text-amber-600"
          >
            Deadline
          </label>
          <input
            type="date"
            {...register("date", { required: true })}
            min={today} // Set minimum date to today
            max={today + 90} // Set maximum date to today + 90 days
            className="p-2 mb-2 bg-amber-100 text-amber-600 w-full sm:w-2/3 md:w-1/3"
          />
          {errors.date?.type === "required" && (
            <p role="alert" className="text-blue-500 pb-2">
              Date is required...
            </p>
          )}
          <label
            htmlFor="requesttext"
            className="text-xs font-mono mt-2 font-bold text-amber-600"
          >
            Description
          </label>
          <textarea
            {...register("rText", { required: true })}
            placeholder="Request text"
            className="p-2 mb-2 bg-amber-100 text-amber-600 placeholder:text-amber-600 placeholder:font-light"
            rows="8"
          />
          {errors.rText?.type === "required" && (
            <p role="alert" className="text-blue-500 pb-2">
              Request Text is required...
            </p>
          )}
          <label
            htmlFor="avatar"
            className="text-xs font-mono mt-2 font-bold text-amber-600"
          >
            Choose a Request picture:
          </label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/png, image/jpeg"
            className="p-2 mb-2 bg-amber-100 text-amber-600"
          />
          <input
            type="submit"
            value="Send Request"
            className="py-3 mt-4 mb-3 self-center text-white bg-amber-600 w-full md:w-1/3 shadow-md hover:cursor-pointer hover:shadow-xl"
          />
        </div>
      </form>
    </>
  );
}
