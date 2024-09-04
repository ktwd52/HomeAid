import React, { useState, useEffect, useContext } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Input, Image, Tabs, Tab, Button } from "@nextui-org/react";
import ENVConfig from "../../Utils/env.config";
import { AuthContext } from "../../context/AuthProvider";
import UploadProfileImg from "./UploadProfileImg";

export default function Mod_MyProfile() {
  const { user, getProfile, updateprofile } = useContext(AuthContext);
  const APIKey = import.meta.env.VITE_LIQ_APIKEY;

  useEffect(() => {
    getProfile();
  }, []);

  const [profile, setProfile] = useState({
    firstname: user.firstname || "",
    lastname: user.lastname || "",
    phone: user.phone || "",
    profileimg: user.profileimg || "../../../img/profile_avatar.png",
    updatedBy: user.username || undefined,
    username: user.username || "",
    email: user.email || "",
    maxDistance: user.maxDistance || 5,
  });

  const [geoCoordinates, setGeoCoordinates] = useState({
    lat: user?.addressObj?.geoLocation?.coordinates?.[1] || "",
    lon: user?.addressObj?.geoLocation?.coordinates?.[0] || "",
  });

  const [addressObjState, setAddressObjState] = useState({
    house_number: user.addressObj?.house_number || "",
    road: user.addressObj?.road || "",
    postcode: user.addressObj?.postcode || "",
    city: user.addressObj?.city || "",
    state: user.addressObj?.state || "",
    county: user.addressObj?.county || "",
    country: user.addressObj?.country || "",
  });

  const [isLoading, setIsLoading] = useState(false);

  // Toast Message setup
  const showToast = (message, type = "error") => {
    toast(message, { type });
  };

  const validateAddress = () => {
    if (
      !addressObjState.house_number ||
      !addressObjState.road ||
      !addressObjState.city
    ) {
      showToast("City, road, and house number are required.");
      return false;
    }
    return true;
  };

  const getCoordinatesFromAddress = async () => {
    if (!validateAddress()) return;

    try {
      setIsLoading(true);

      const { house_number, road, postcode, city, state, county, country } =
        addressObjState;

      const response = await axios.get(
        `https://eu1.locationiq.com/v1/search/structured?street=${road} ${house_number}&city=${city}&state=${state}&country=${country}&postalcode=${postcode}&format=json&key=${APIKey}`
      );

      if (response.data && response.data.length > 0) {
        const { lat, lon } = response.data[0];
        setGeoCoordinates({ lat, lon });
        showToast("Coordinates fetched successfully!", "success");
      } else {
        showToast("No coordinates found for the given address.");
      }
    } catch (error) {
      handleAxiosError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const getCurrentLocation = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setGeoCoordinates({ lat: latitude, lon: longitude });

          showToast(
            `Latitude: ${latitude}, Longitude: ${longitude}`,
            "success"
          );

          await getReverseGeoData(latitude, longitude);
        },
        (error) => {
          showToast("Error getting location: ", error.message);
          console.error("Error getting location:", error);
        }
      );
    } else {
      showToast("Geolocation is not supported by this browser.");
      console.error("Geolocation is not supported by this browser.");
    }
  };

  const getReverseGeoData = async (lat, lon) => {
    try {
      setIsLoading(true);
      const options = {
        method: "GET",
        url: `https://eu1.locationiq.com/v1/reverse?lat=${lat}&lon=${lon}&format=json&zoom=16&normalizeaddress=1&key=${APIKey}`,
        headers: { accept: "application/json" },
      };

      const response = await axios.request(options);

      if (response.data) {
        showToast("Address fetched successfully!", "success");
        setAddressObjState(response.data.address);
      }
    } catch (error) {
      handleAxiosError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateUserProfile = async () => {
    try {
      setIsLoading(true);
      const res = await axios.put(
        `${ENVConfig.API_ServerURL}/auth/profile`,
        {
          firstname: profile.firstname,
          lastname: profile.lastname,
          phone: profile.phone,
          maxDistance: profile.maxDistance,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (res.data) {
        showToast("Profile updated successfully!", "success");
      }
    } catch (error) {
      handleAxiosError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateAddress = async () => {
    if (!geoCoordinates.lat || !geoCoordinates.lon) {
      if (!validateAddress()) return;
      await getCoordinatesFromAddress();
    }

    if (!validateAddress() && (!geoCoordinates.lat || !geoCoordinates.lon)) {
      showToast("All address fields and coordinates are required.");
      return;
    }

    const updatedAddressObj = {
      ...addressObjState,
      geoLocation: {
        coordinates: [geoCoordinates.lon, geoCoordinates.lat],
      },
    };

    try {
      setIsLoading(true);
      const res = await axios.put(
        `${ENVConfig.API_ServerURL}/auth/profile`,
        {
          addressObj: updatedAddressObj,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (res.data) {
        showToast("Address updated successfully!", "success");
      }
    } catch (error) {
      handleAxiosError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateAll = async () => {
    await updateUserProfile();
    await updateAddress();
  };

  const handleAxiosError = (error) => {
    if (error.response) {
      showToast(`(${error.response.status}) ${error.response.data.error}`);
    } else {
      showToast("An unknown error occurred.");
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="flex">
        <Image
          isZoomed
          isBlurred
          width={300}
          height={300}
          alt="Profile Avatar"
          src={profile.profileimg}
          className="flex w-[300px] h-[300px] snap-center rounded-full"
        />
        <Button className="flex" />
        <UploadProfileImg className="flex align-baseline" />
      </div>

      <Tabs aria-label="Options" className="flex">
        <Tab key="profile" title="Personal Details">
          <Input
            label="First Name"
            placeholder="Enter First Name"
            value={profile.firstname}
            onChange={(e) =>
              setProfile({ ...profile, firstname: e.target.value })
            }
            required
          />
          <Input
            label="Last Name"
            placeholder="Enter Last Name"
            value={profile.lastname}
            onChange={(e) =>
              setProfile({ ...profile, lastname: e.target.value })
            }
            required
          />
          <Input
            label="Phone Number"
            placeholder="Enter Phone Number"
            value={profile.phone}
            onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
            required
          />
          <Input
            label="Max Distance"
            type="number"
            placeholder="Enter max. distance in km where you can offer help"
            value={profile.maxDistance}
            onChange={(e) =>
              setProfile({ ...profile, maxDistance: e.target.value })
            }
          />
          <Input
            label="Username"
            placeholder="Enter Username"
            value={profile.username}
            readOnly
            required
          />
          <Input
            label="Email"
            placeholder="Enter Email"
            value={profile.email}
            readOnly
            required
          />
          <Button
            onClick={updateUserProfile}
            disabled={isLoading}
            color="primary"
            className="mt-4"
          >
            Update User Profile
          </Button>
        </Tab>
        <Tab key="address" title="Address Details">
          <Input
            label="City"
            placeholder="Enter City"
            value={addressObjState.city}
            onChange={(e) =>
              setAddressObjState({
                ...addressObjState,
                city: e.target.value,
              })
            }
            required
          />
          <Input
            label="Road"
            placeholder="Enter Road"
            value={addressObjState.road}
            onChange={(e) =>
              setAddressObjState({
                ...addressObjState,
                road: e.target.value,
              })
            }
            required
          />
          <Input
            label="House Number"
            placeholder="Enter House Number"
            value={addressObjState.house_number}
            onChange={(e) =>
              setAddressObjState({
                ...addressObjState,
                house_number: e.target.value,
              })
            }
            required
          />
          <Input
            label="Postcode"
            placeholder="Enter Postcode"
            value={addressObjState.postcode}
            onChange={(e) =>
              setAddressObjState({
                ...addressObjState,
                postcode: e.target.value,
              })
            }
          />
          <Input
            label="State"
            placeholder="Enter State"
            value={addressObjState.state}
            onChange={(e) =>
              setAddressObjState({
                ...addressObjState,
                state: e.target.value,
              })
            }
          />
          <Input
            label="County"
            placeholder="Enter County"
            value={addressObjState.county}
            onChange={(e) =>
              setAddressObjState({
                ...addressObjState,
                county: e.target.value,
              })
            }
          />
          <Input
            label="Country"
            placeholder="Enter Country"
            value={addressObjState.country}
            onChange={(e) =>
              setAddressObjState({
                ...addressObjState,
                country: e.target.value,
              })
            }
            required
          />
          <Input
            label="Latitude"
            placeholder="Latitude"
            value={geoCoordinates.lat}
            onChange={(e) =>
              setGeoCoordinates({ ...geoCoordinates, lat: e.target.value })
            }
          />
          <Input
            label="Longitude"
            placeholder="Longitude"
            value={geoCoordinates.lon}
            onChange={(e) =>
              setGeoCoordinates({ ...geoCoordinates, lon: e.target.value })
            }
          />

          <div className="flex justify-between mt-4">
            <Button
              onClick={getCurrentLocation}
              disabled={isLoading}
              color="primary"
            >
              Get Address from Coordinates
            </Button>

            <Button
              onClick={updateAddress}
              disabled={isLoading}
              color="secondary"
            >
              Update Address
            </Button>
          </div>
        </Tab>
      </Tabs>

      <div className="flex justify-between mt-4">
        <Button onClick={updateAll} disabled={isLoading} color="primary">
          Update All
        </Button>
      </div>
    </>
  );
}
