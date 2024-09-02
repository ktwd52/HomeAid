import React, { useState, useContext } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Tabs,
  Tab,
  Card,
  CardBody,
} from "@nextui-org/react";
import ENVConfig from "../../Utils/env.config";
import { AuthContext } from "../../context/AuthProvider";
import UploadProfileImg from "../ImageUpload/UploadProfileImg";

export default function ModalGetGeoData() {
  const { user } = useContext(AuthContext);
  const APIKey = import.meta.env.VITE_LIQ_APIKEY;

  // Initialize states with defaults and checks for undefined properties
  const addressObj = user.addressObj || {};

  const [profile, setProfile] = useState({
    firstname: user.firstname || "",
    lastname: user.lastname || "",
    phone: user.phone || "",
    updatedBy: user.username || undefined,
    username: user.username || "", // readonly
    email: user.email || "", // readonly
    maxDistance: user.maxDistance || 5,
  });

  const [geoCoordinates, setGeoCoordinates] = useState({
    lat: addressObj.geoLocation?.coordinates?.[1] || "", // lat and lon might be in different order
    lon: addressObj.geoLocation?.coordinates?.[0] || "",
  });

  const [addressObjState, setAddressObjState] = useState({
    house_number: addressObj.house_number || "",
    road: addressObj.road || "",
    postcode: addressObj.postcode || "",
    city: addressObj.city || "",
    state: addressObj.state || "",
    country: addressObj.country || "",
  });

  const [isLoading, setIsLoading] = useState(false);

  // Toast Message setup
  const showToast = (message, type = "error") => {
    toast(message, { type });
  };

  const validateProfile = () => {
    if (!profile.firstname || !profile.lastname || !profile.phone) {
      showToast("First name, last name, and phone number are required.");
      return false;
    }
    if (profile.maxDistance < 1 || profile.maxDistance > 99) {
      showToast("Max distance must be between 1 and 99 km.");
      return false;
    }
    return true;
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

      const { house_number, road, postcode, city, state, country } =
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

  const updateProfile = async () => {
    if (!validateProfile()) return;
    try {
      setIsLoading(true);
      const res = await axios.put(
        `${ENVConfig.API_ServerURL}/auth/profile`,
        {
          firstname: profile.firstname,
          lastname: profile.lastname,
          phone: profile.phone,
          maxDistance: profile.maxDistance,
          updatedBy: user.username,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (res.data) {
        showToast("Profile updated successfully!", "success");
        setProfile(res.data);
      }
    } catch (error) {
      handleAxiosError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateAddress = async () => {
    if (!validateAddress()) return;
    await getCoordinatesFromAddress();

    // Update address object with coordinates
    const updatedAddressObj = {
      ...addressObjState,
      geoLocation: {
        coordinates: [geoCoordinates.lon, geoCoordinates.lat], // Ensure correct order: [lon, lat]
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

  function getCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          await setGeoCoordinates(latitude, longitude);
          showToast(
            `Latitude: ${latitude}, Longitude: ${longitude}`,
            "success"
          );
        },
        (error) => {
          showToast("Error getting location: ", error);
          console.error("Error getting location:", error);
        }
      );
    } else {
      showToast("Geolocation is not supported by this browser.");
      console.error("Geolocation is not supported by this browser.");
    }
  }

  const getReverseGeoData = async () => {
    try {
      setIsLoading(true);
      const { lat, lon } = geoCoordinates;
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

  const handleAxiosError = (error) => {
    if (error.response) {
      showToast(`(${error.response.status}) ${error.response.data.error}`);
    } else {
      showToast("An unknown error occurred.");
    }
  };

  const updateAll = async () => {
    await updateProfile();
    await updateAddress();
  };

  return (
    <>
      <ToastContainer />
      <div className="flex w-full flex-col">
        <Tabs aria-label="Options">
          <Tab key="profileimg" title="Profile Picture / Avatar">
            <UploadProfileImg />
          </Tab>

          <Tab key="profile" title="Personal Details">
            <Card>
              <CardBody>
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
                  onChange={(e) =>
                    setProfile({ ...profile, phone: e.target.value })
                  }
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

                <Button isLoading={isLoading} onPress={updateProfile}>
                  Update User
                </Button>
              </CardBody>
            </Card>
          </Tab>
          <Tab key="address" title="Address Details">
            <Card>
              <CardBody>
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
                  label="Country"
                  placeholder="Enter Country"
                  value={addressObjState.country}
                  onChange={(e) =>
                    setAddressObjState({
                      ...addressObjState,
                      country: e.target.value,
                    })
                  }
                />
                {/* <Button
                  className=""
                  color="warning"
                  isLoading={isLoading}
                  onPress={getCoordinatesFromAddress}
                >
                  Get GeoCoordinates from Address
                </Button> */}
                <Button
                  className=""
                  color="warning"
                  isLoading={isLoading}
                  onPress={updateAddress}
                >
                  Update Address
                </Button>
              </CardBody>
              <Button
                isLoading={isLoading}
                size="md"
                className=""
                radius="medium"
                variant="bordered"
                onPress={async () => {
                  const { lat, lon } = await getCurrentLocation();
                  await setGeoCoordinates({ lat, lon });
                }}
              >
                Get Device Location
              </Button>
              <CardBody>
                <Input
                  label="Latitude"
                  placeholder="Enter Latitude"
                  value={geoCoordinates.lat}
                  onChange={(e) =>
                    setGeoCoordinates({
                      ...geoCoordinates,
                      lat: e.target.value,
                    })
                  }
                  required
                />
                <Input
                  label="Longitude"
                  placeholder="Enter Longitude"
                  value={geoCoordinates.lon}
                  onChange={(e) =>
                    setGeoCoordinates({
                      ...geoCoordinates,
                      lon: e.target.value,
                    })
                  }
                  required
                />
                <Button isLoading={isLoading} onPress={getReverseGeoData}>
                  Get Address from Current GeoLocation
                </Button>
              </CardBody>
            </Card>
          </Tab>
        </Tabs>
        <Button color="success" isLoading={isLoading} onPress={updateAll}>
          Update All
        </Button>
      </div>
    </>
  );
}
