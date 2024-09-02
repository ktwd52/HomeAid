import { useForm } from "react-hook-form";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthProvider";
import Mod_MyProfile from "./MyProfile/Mod_MyProfile";

const groupAddressToObject = (formData) => {
  const {
    firstname,
    lastname,
    language,
    phone,
    house_number,
    road,
    city,
    state,
    country,
    postcode,
    longitude,
    latitude,
    isOfferingHelp,
    email,
    username,
  } = formData;
  return {
    firstname,
    lastname,
    language,
    phone,
    isOfferingHelp,
    email,
    username,
    adressObj: {
      house_number,
      road,
      postcode,
      city,
      state,
      country,
      geoLocation: {
        longitude,
        latitude,
      },
    },
  };
};

const ungroupAddressToFields = (profile) => {
  const {
    firstname,
    lastname,
    language,
    phone,
    adressObj,
    isOfferingHelp,
    email,
    username,
  } = profile;

  return {
    firstname,
    lastname,
    language,
    phone,
    ...(adressObj || {}),
    ...(adressObj?.geoLocation || {}),
    isOfferingHelp,
    email,
    username,
  };
};

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
  { label: "Language", id: "language", type: "text", placeholder: "Language" },
  { label: "Phone", id: "phone", type: "tel", placeholder: "Phone" },
  {
    label: "House number",
    id: "house_number",
    type: "text",
    placeholder: "House Number",
  },
  { label: "Road", id: "road", type: "text", placeholder: "Road" },
  { label: "State", id: "state", type: "text", placeholder: "State" },
  { label: "City", id: "city", type: "text", placeholder: "City" },
  { label: "Country", id: "country", type: "text", placeholder: "Country" },
  {
    label: "Postal Code",
    id: "postcode",
    type: "text",
    placeholder: "Postal Code",
  },
  {
    label: "Adress - Longitude",
    id: "longitude",
    type: "text",
    placeholder: "Longitude",
  },
  {
    label: "Adress - Latitude",
    id: "latitude",
    type: "text",
    placeholder: "Latitude",
  },
  {
    label: "Offering Help",
    id: "isOfferingHelp",
    type: "checkbox",
    placeholder: "Offering Help",
  },
  {
    label: "Email",
    id: "email",
    type: "text",
    placeholder: "Email",
    disabled: true,
  },
  {
    label: "Username",
    id: "username",
    type: "text",
    placeholder: "Username",
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
  setFormData,
}) => (
  <label key={id} htmlFor={id}>
    {label}:
    <input
      type={type}
      id={id}
      {...callback(id, { required: false })}
      placeholder={placeholder}
      disabled={disabled}
      value={value || ""}
      onChange={(e) =>
        setFormData((prev) => ({
          ...prev,
          [id]: e.target.value,
        }))
      }
    />
    <br /> <br />
  </label>
);

function Profile() {
  const [formData, setFormData] = useState({});
  const { register, handleSubmit } = useForm();
  const { profile, getProfile, updateprofile } = useContext(AuthContext);

  useEffect(() => {
    getProfile();
  }, []);

  useEffect(() => {
    if (profile) {
      setFormData(ungroupAddressToFields(profile));
    }
  }, [profile]);

  const onSubmit = (data) => {
    updateprofile(groupAddressToObject(data));
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid bg-orange-400 py-16 gap-y-4 px-8"
      >
        <h1>Hi {formData?.username}, please update your details.. </h1>
        <br />
        <fieldset>
          <legend>
            {labels.map((label) => (
              <LabelField
                label={label.label}
                key={label.id}
                callback={register}
                id={label.id}
                type={label.type}
                placeholder={label.placeholder}
                disabled={label.disabled}
                value={formData?.[label.id] || ""}
                setFormData={setFormData}
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
