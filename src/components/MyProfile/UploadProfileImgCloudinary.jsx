import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ENVConfig from "../../Utils/env.config";
import cloudinaryUpload from "../../Utils/cloudinary";
import axios from "axios";

function UploadProfileImg() {
  const [image, setImage] = useState("../../../img/profile_avatar.png");
  const [imageCloud, setImageCloud] = useState(
    "../../../img/profile_avatar.png"
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const showToast = (message, type = "error") => {
    toast(message, { type });
  };

  // Multer upload to the backend server
  const onSubmitMulter = async (data) => {
    try {
      const formData = new FormData();
      formData.append("image", data.image[0]);

      const response = await axios.post(
        `${ENVConfig.API_ServerURL}/auth/upload-img`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      showToast(
        `Image upload successful to: ${response.data.file.path}`,
        "success"
      );
      setImage(response.data.file.path);
    } catch (error) {
      console.error("Error uploading image:", error);
      showToast(
        `Image upload failed, reason: ${
          error.response?.data?.error || error.message
        }. Please try again.`
      );
    }
  };

  // Cloudinary upload to the cloud
  const onSubmitCloudinary = async (data) => {
    try {
      const imageFile = data.imageCloud[0];
      const uploadedImageUrl = await cloudinaryUpload(imageFile);
      setImageCloud(uploadedImageUrl);
      showToast("Image uploaded successfully to Cloudinary!", "success");
    } catch (error) {
      console.error("Error uploading to Cloudinary:", error);
      showToast(
        "Image upload to Cloudinary failed. Please try again.",
        "error"
      );
    }
  };

  // {
  //   /* Form for Multer upload */
  // }
  // <div>
  //   <form onSubmit={handleSubmit(onSubmitMulter)}>
  //     <input type="file" {...register("image", { required: true })} />
  //     {errors.image && <span>This field is required</span>}
  //     <button type="submit">Upload Image to Server</button>
  //   </form>

  //   <img src={image} alt="Uploaded Profile" />
  // </div>;

  return (
    <>
      <ToastContainer />

      {/* Form for Cloudinary upload */}
      <div>
        <form onSubmit={handleSubmit(onSubmitCloudinary)}>
          <input type="file" {...register("imageCloud", { required: true })} />
          {errors.imageCloud && <span>This field is required</span>}
          <button type="submit">Upload Image to Cloudinary</button>
        </form>

        <img src={imageCloud} alt="Uploaded Profile to Cloudinary" />
      </div>
    </>
  );
}

export default UploadProfileImg;
