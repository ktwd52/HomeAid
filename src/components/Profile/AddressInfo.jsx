// components/AddressInfo.js
import React from "react";
import { useUserProfile } from "../../context/AuthProvider";
import { Input, Button } from "@nextui-org/react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

export default function AddressInfo() {
  const {
    addressObjState,
    setAddressObjState,
    geoCoordinates,
    setGeoCoordinates,
    isLoading,
    setIsLoading,
  } = useUserProfile();

  const APIKey = import.meta.env.VITE_LIQ_APIKEY;

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        setGeoCoordinates({ lat: latitude, lon: longitude });
        await getReverseGeoData(latitude, longitude);
      });
    }
  };

  const getReverseGeoData = async (lat, lon) => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `https://eu1.locationiq.com/v1/reverse?lat=${lat}&lon=${lon}&format=json&key=${APIKey}`
      );
      setAddressObjState(response.data.address);
      toast.success("Address fetched successfully!");
    } catch (error) {
      toast.error("Error fetching address.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <ToastContainer />
      <div>
        <Input
          label="City"
          value={addressObjState.city || ""}
          onChange={(e) =>
            setAddressObjState({ ...addressObjState, city: e.target.value })
          }
        />
        <Input
          label="Road"
          value={addressObjState.road || ""}
          onChange={(e) =>
            setAddressObjState({ ...addressObjState, road: e.target.value })
          }
        />
        <Button onClick={getCurrentLocation} disabled={isLoading}>
          Get Current Location
        </Button>
        <Button onClick={() => console.log("Update Address Info")}>
          Update Address
        </Button>
      </div>
    </>
  );
}
