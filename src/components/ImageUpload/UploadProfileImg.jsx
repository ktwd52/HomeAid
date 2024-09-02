import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

function UploadProfileImg() {
  const [image, setImage] = useState();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("image", data.image[0]);

      const response = await axios.post(
        "http://localhost:3000/upload-file",
        formData
      );

      console.log(response.data);
      setImage(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="file" {...register("image")} />

      <input type="submit" />

      {image && <img src={image.destination} />}
    </form>
  );
}

export default UploadProfileImg