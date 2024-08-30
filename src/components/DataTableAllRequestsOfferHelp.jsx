import ENVConfig from "../Utils/env.config";
import axios from "axios";
import formatDate from "../Utils/formatDate";
import React, { useEffect, useState, useContext } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
} from "@nextui-org/react";
import { FaTrash, FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import ModalRequestDetails from "./ModalRequestDetails";
import PleaseLogin from "./PleaseLogin";
import { AuthContext } from "../context/AuthProvider";

// Main App Component
const DataTableRequest = () => {
  const [requests, setRequests] = useState([]);
  const [deleteRequest, setDeleteRequest] = useState(true);
  const [showLoginPage, setShowLoginPage] = useState(false); // to manage state when Axios fetch is having an error
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    const getRequests = async () => {
      try {
        const res = await axios.get(
          `${ENVConfig.API_ServerURL}/requests?rStatus<3`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (res.data) {
          // console.log(res.data);
          setRequests(res.data);
        }
      } catch (error) {
        // Check if the error response exists and display the error message
        if (error.response) {
          console.error(
            `(${error.response.status}) ${error.response.data.error}`
          );
        } else {
          console.log("An unknown error happened: ", error);
        }
        setShowLoginPage(true); // Show the login page on error
      }
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
      console.log(res);
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
    3: "Offer Accepted",
    5: "In Progress",
    9: "Finished",
  };

  const columns = [
    { key: "rCategory", label: "REQUEST CATEGORY" },
    { key: "rText", label: "REQUEST TEXT" },
    { key: "rDate", label: "REQUEST DATE" },
    { key: "rImage", label: "REQUEST IMAGE(ES)" },
    { key: "rStatus", label: "STATUS" },
    { key: "offerCount", label: "OFFER COUNT" },
    { key: "actions", label: "ACTIONS" }, // New column for action buttons
  ];
  // If showLoginPage is true, render the PleaseLogin component
  if (showLoginPage) {
    return <PleaseLogin />;
  }
  return (
    <div className="relative h-64 overflow-y-auto">
      <Table className="" aria-label="Expandable table with dynamic content">
        <TableHeader className="sticky top-0 bg-white z-10" columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody items={requests}>
          {/* <Accordion> */}
          {(item) => (
            <TableRow key={item._id}>
              {(columnKey) => (
                <TableCell>
                  {columnKey === "rStatus" ? (
                    statusLabels[item[columnKey]] || "Unknown Status"
                  ) : columnKey === "rDate" ? (
                    formatDate(item[columnKey])
                  ) : columnKey === "offerCount" ? (
                    //  item.offerId === 0 ? (
                    <ModalRequestDetails
                      id={item._id}
                      // offer={`${item.offerId.length} Offers`}
                      // isDisabled={item.offerId === 0} // Disable button if no offers
                    />
                  ) : // ) : (
                  //   "No Offers" )
                  // Count the number of offers
                  columnKey === "rImage" ? (
                    item.rImage.length > 0 ? ( // Count the number of Images
                      "Image available" // If there are images
                    ) : (
                      "No image available"
                    ) // If there are no images
                  ) : columnKey === "actions" ? (
                    <div style={{ display: "flex", gap: "10px" }}>
                      <Button
                        auto
                        icon={<FaTrash />}
                        color="error"
                        onClick={() => deleteRequestById(item._id)}
                      >
                        Delete
                      </Button>
                    </div>
                  ) : (
                    item[columnKey]
                  )}
                  {/* </AccordionItem> */}
                </TableCell>
              )}
            </TableRow>
          )}
          {/* </Accordion> */}
        </TableBody>
      </Table>
    </div>
  );
};

export default DataTableRequest;
