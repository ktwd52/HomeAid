import { useForm } from "react-hook-form";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthProvider";

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
    isOfferingHelp,
    email,
    username,
  } = formData;
  return {
    firstname,
    lastname,
    language,
    phone,
    postcode,
    isOfferingHelp,
    email,
    username,
    adressObj: {
      house_number,
      road,
      city,
      state,
      country,
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
    ...(adressObj ? adressObj : {}),
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
  {
    label: "Language",
    id: "language",
    type: "text",
    placeholder: "language",
  },
  {
    label: "Phone",
    id: "phone",
    type: "tel",
    placeholder: "phone",
  },
  {
    label: "House number",
    id: "house_number",
    type: "text",
    placeholder: "house_number",
  },
  {
    label: "Road",
    id: "road",
    type: "text",
    placeholder: "road",
  },
  {
    label: "State",
    id: "state",
    type: "text",
    placeholder: "state",
  },
  {
    label: "City",
    id: "city",
    type: "text",
    placeholder: "city",
  },
  {
    label: "Country",
    id: "country",
    type: "text",
    placeholder: "country",
  },
  {
    label: "Postal Code",
    id: "postcode",
    type: "text",
    placeholder: "Postal Code",
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
      value={value}
      onChange={(e) =>
        setFormData((prev) => {
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
  const [formData, setFormData] = useState({});

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const {
    profile,
    getProfile,
    updateprofile,
  } = useContext(AuthContext);

  useEffect(() => {
    getProfile();
  }, []);

  useEffect(() => {
    if (profile) {
      setFormData(ungroupAddressToFields(profile));
    }
  }, [profile]);

  console.log("Render - profile, formData", profile, formData);

  const onSubmit = () => {
    updateprofile(groupAddressToObject(formData));
  };
  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid bg-orange-400 py-16 gap-y-4 px-8"
      >
        <h1>Hi {formData?.username}, please update your details.. </h1> <br />
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
                value={formData?.[label.id] ? formData[label.id] : ""}
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
