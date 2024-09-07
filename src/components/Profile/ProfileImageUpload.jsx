// components/ProfileImageUpload.js
import React, { useState } from "react";
import { useUserProfile } from "../../context/AuthProvider";
import { Input, Image, Button } from "@nextui-org/react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

export default function ProfileImageUpload() {
  const { profile, setProfile, isLoading, setIsLoading } = useUserProfile();
  const [image, setImage] = useState();

  const handleImageUpload = async (data) => {
    try {
      const formData = new FormData();
      formData.append("image", data.target.files[0]);

      const response = await axios.put("/auth/profileimg", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      toast.success("Image uploaded successfully!");
      setProfile({ ...profile, profileimg: response.data.profileimg });
    } catch (error) {
      toast.error("Error uploading image.");
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="flex">
        <Image
          src={profile.profileimg || "../../../img/profile_avatar.png"}
          width={300}
          height={300}
          alt="Profile Avatar"
        />
        <input type="file" onChange={handleImageUpload} disabled={isLoading} />
      </div>
      <div>
        <Input
          label="First Name"
          value={profile.firstname || ""}
          onChange={(e) =>
            setProfile({ ...profile, firstname: e.target.value })
          }
        />
        <Input
          label="Last Name"
          value={profile.lastname || ""}
          onChange={(e) => setProfile({ ...profile, lastname: e.target.value })}
        />
        <Input
          label="Phone"
          value={profile.phone || ""}
          onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
        />
        <Button onClick={() => console.log("Update User Data")}>
          Update Profile
        </Button>
      </div>
    </>
  );
}
