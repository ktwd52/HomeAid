import ENVConfig from "../../Utils/env.config";
import axios from "axios";
import formatDate from "../../Utils/formatDate";
import React, { useEffect, useState, useContext } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Spinner,
  Button,
} from "@nextui-org/react";
import { FaTrash, FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Mod_OfferHelp from "./Mod_OfferHelp";
import PleaseLogin from "../PleaseLogin";
import { AuthContext } from "../../context/AuthProvider";

//Data Table for All Requests where rStatus < 2
const UD_OfferHelp = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showLoginPage, setShowLoginPage] = useState(false); // to manage state when Axios fetch is having an error
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    const getRequests = async () => {
      try {
        const res = await axios.get(`${ENVConfig.API_ServerURL}/requests`, {
          params: { rStatus: { $lt: 5 } },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (res.data) {
          setRequests(res.data);
        }
      } catch (error) {
        if (error.response) {
          console.error(
            `(${error.response.status}) ${error.response.data.error}`
          );
        } else {
          console.log("An unknown error happened: ", error);
        }
        setShowLoginPage(true); // Show the login page on error
      }
      setLoading(false);
    };

    getRequests();
  }, []);

  const deleteRequestById = async (id) => {
    try {
      await axios.delete(`${ENVConfig.API_ServerURL}/requests/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setRequests(requests.filter((request) => request._id !== id));
    } catch (error) {
      // Check if the error response exists and display the error message
      if (error.response) {
        console.error(
          `(${error.response.status}) ${error.response.data.error}`
        );
      } else {
        console.log("An unknown error happened: ", error);
      }
    }
  };

  const viewDetails = (id) => {
    navigate(`/request-details/${id}`);
  };

  const statusLabels = {
    0: "Awaiting Offer",
    1: "Offer Received",
    5: "Offer Accepted",
    6: "In Progress",
    9: "Finished",
  };

  const columns = [
    { key: "rStatus", label: "STATUS" },
    { key: "rCategory", label: "REQUEST CATEGORY" },
    { key: "rText", label: "REQUEST TEXT" },
    { key: "rDate", label: "REQUEST DATE" },
    { key: "rImage", label: "REQUEST IMAGE(ES)" },
    { key: "offerCount", label: "PENDING OFFERS" },
    { key: "actions", label: "OFFER HELP" }, // New column for action buttons
  ];
  // If showLoginPage is true, render the PleaseLogin component

  if (showLoginPage) {
    return <PleaseLogin />;
  }
  return loading ? (
    <Spinner />
  ) : (
    <div className="relative h-64 overflow-y-auto">
      <Table className="" aria-label="Expandable table with dynamic content">
        <TableHeader className="sticky top-0 bg-white z-10" columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody items={requests}>
          {(item) => (
            <TableRow key={item._id}>
              {(columnKey) => (
                <TableCell>
                  {columnKey === "rStatus" ? (
                    statusLabels[item[columnKey]] || "Unknown Status"
                  ) : columnKey === "rDate" ? (
                    formatDate(item[columnKey])
                  ) : columnKey === "offerCount" ? (
                    item[columnKey] // Count the number of offers
                  ) : columnKey === "rImage" ? (
                    item.rImage.length > 0 ? ( // Count the number of Images
                      "Image available" // If there are images
                    ) : (
                      "No image available"
                    ) // If there are no images
                  ) : columnKey === "actions" ? (
                    <div style={{ display: "flex", gap: "10px" }}>
                      <Mod_OfferHelp
                        id={item._id}
                        isDisabled={item.offerId ? true : false}
                      />
                      // Disable button if no offers
                      <Button
                        auto
                        icon={<FaTrash />}
                        color="error"
                        onClick={() =>
                          deleteRequestById(item._id, setRequests())
                        }
                      >
                        Delete
                      </Button>
                    </div>
                  ) : (
                    item[columnKey]
                  )}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default UD_OfferHelp;
