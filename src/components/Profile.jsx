/* function Profile() {
  return <>Profile</>;
}

export default Profile; */
import { useForm } from "react-hook-form";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthProvider";

const labels = [
  {
    label: "First Name",
    id: "firstname",
    type: "text",
    placeholder: "First Name",
  },
  {
    label: "Last Name",
    id: "lastname",
    type: "text",
    placeholder: "Last Name",
  },
  {
    label: "Language",
    id: "language",
    type: "text",
    placeholder: "language",
  },
  {
    label: "House number",
    id: "adressObj.house_number",
    type: "text",
    placeholder: "house_number",
  },
  {
    label: "Road",
    id: "adressObj.road",
    type: "text",
    placeholder: "road",
  },
  {
    label: "Phone",
    id: "phone",
    type: "tel",
    placeholder: "phone",
  },
  {
    label: "State",
    id: "adressObj.state",
    type: "text",
    placeholder: "state",
  },
  {
    label: "City",
    id: "adressObj.city",
    type: "text",
    placeholder: "city",
  },
  {
    label: "Postal Code",
    id: "adressObj.postcode",
    type: "text",
    placeholder: "Postal Code",
  },
  {
    label: "Country",
    id: "adressObj.country",
    type: "text",
    placeholder: "country",
  },
  {
    label: "Offering Help",
    id: "isOfferingHelp",
    type: "checkbox",
    placeholder: "isOfferingHelp",
  },
  {
    label: "Email",
    id: "email",
    type: "text",
    placeholder: "email",
    disabled: true,
  },
  {
    label: "Username",
    id: "username",
    type: "text",
    placeholder: "username",
    disabled: true,
  },
];

const LabelField = ({
  callback,
  label,
  id,
  type,
  placeholder,
  disabled = false,
  value,
  setProfile,
}) => (
  <label key={id} htmlFor={id}>
    {label}:
    <input
      type={type}
      id={id}
      {...callback(id, { required: false })}
      placeholder={placeholder}
      disabled={disabled}
      value={value}
      onChange={(e) =>
        setProfile((prev) => {
          return {
            ...prev,
            [id]: e.target.value,
          };
        })
      }
    />
    <br /> <br />
  </label>
);

function Profile() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const {
    user,
    profile,
    login,
    signup,
    setProfile,
    getProfile,
    updateprofile,
  } = useContext(AuthContext);
  useEffect(() => {
    getProfile();
  }, []);

  useEffect(() => {
    console.log("Profile changed", profile);
  }, [profile]);

  console.log("Render", profile);

  const onSubmit = (data) => {
    console.log("onSubmit ", data); // make API call
    updateprofile(data);
  };
  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid bg-orange-400 py-16 gap-y-4 px-8"
      >
        <h1>Hi {profile?.username}, please update your details.. </h1> <br />
        <fieldset>
          <legend>
            {/* Create your Account <br /> <br /> */}
            {/* Update your Account <br /> <br /> */}
            {labels.map((label) => (
              <LabelField
                label={label.label}
                key={label.id}
                callback={register}
                id={label.id}
                type={label.type}
                placeholder={label.placeholder}
                disabled={label.disabled}
                value={profile?.[label.id] ? profile[label.id] : ""}
                setProfile={setProfile}
                /*  onChange={(e) => {
                  e.target.value;
                }} */
                // value={profile[label.id] ? profile[label.id] : ""}
              />
            ))}
            <br /> <br />
            <button
              className="rounded-s-none p-2 max-w-sm mx-auto border-none bg-yellow-200"
              type="submit"
            >
              Update
            </button>
          </legend>
        </fieldset>
      </form>
    </>
  );
}

export default Profile;
