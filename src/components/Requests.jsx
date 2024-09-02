import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { useForm } from "react-hook-form";
import moment from "moment";

export default function Requests() {
  const { user, postRequests } = useContext(AuthContext);
  const StdRequestDate = new Date(new Date().setDate(new Date().getDate() + 7))
    .toISOString()
    .split("T")[0];
  const minDate = new Date().toISOString().split("T")[0];

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const dataWithUserId = { ...data, rUserId: user._id };
    console.log(dataWithUserId);
    postRequests(dataWithUserId);
  };
  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-row justify-center bg-amber-50"
      >
        <div className="flex flex-col w-4/5 max-w-3xl bg-amber-200 shadow-lg px-5 py-4 mt-24 mb-36">
          <h3 className="text-center py-6 text-lg">Create your Request</h3>
          <label htmlFor="titleCategory" className="text-xs font-mono">
            Category
          </label>
          <select
            {...register("rCategory")}
            className="p-2 mb-2 bg-amber-100 w-full sm:w-2/3 md:w-1/3"
          >
            <option value="general">General</option>
            <option value="carpenter">Carpenter</option>
            <option value="cooking">Cooking</option>
            <option value="cleaning">Cleaning</option>
            <option value="gardening">Gardening</option>
            <option value="plumbing">Plumbing</option>
          </select>
          <label htmlFor="date" className="text-xs font-mono mt-2">
            Deadline
          </label>
          <input
            type="date"
            {...register("date", { required: true })}
            value={StdRequestDate}
            min={minDate} // Set minimum date to today
            className="p-2 mb-2 bg-amber-100 w-full sm:w-2/3 md:w-1/3"
          />
          <label htmlFor="requesttext" className="text-xs font-mono mt-2">
            Description
          </label>
          <textarea
            {...register("rText", { required: true })}
            placeholder="Request text"
            className="p-2 mb-2 bg-amber-100"
            rows="8"
          />
          <label htmlFor="avatar" className="text-xs font-mono mt-2">
            Choose a Request picture:
          </label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/png, image/jpeg"
            className="p-2 mb-2 bg-amber-100"
          />
          <input
            type="submit"
            value="Send Request"
            className="py-3 mt-4 mb-3 self-center text-white bg-amber-600 w-full md:w-1/3"
          />
        </div>
      </form>
    </>
  );
}
