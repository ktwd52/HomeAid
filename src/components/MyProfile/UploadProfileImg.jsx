import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ENVConfig from "../../Utils/env.config";
import axios from "axios";

function UploadProfileImg() {
  const [image, setImage] = useState();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Toast Message setup
  const showToast = (message, type = "error") => {
    toast(message, { type });
  };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("image", data.image[0]);

      const response = await axios.post(
        `${ENVConfig.API_ServerURL}/auth/upload-profileimg`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response.data - file);
      showToast(
        `Image upload successful to: ${response.data.file.path}`,
        "success"
      );
      console.log("res.data:", response.data);
      // setImage(response.data); // Assuming response contains the image URL
    } catch (error) {
      console.error("Error uploading image:", error);
      showToast(
        `Image upload failed, reason: ${error.response.data.error}. Please try again.`
      );
    }
  };

  return (
    <>
      <ToastContainer />
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="file" {...register("image", { required: true })} />
        {errors.image && <span>This field is required</span>}
        <div>
          <button type="submit">Upload Image</button>
        </div>
      </form>

      {image ? (
        <img src={image} alt="My Profile" />
      ) : (
        <img src="../../../img/profile_avatar.png" alt="My Profile avatar" />
      )}
    </>
  );
}

export default UploadProfileImg;
