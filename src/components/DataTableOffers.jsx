import ENVConfig from "../Utils/env.config";
import axios from "axios";
import formatDate from "../Utils/formatDate";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
} from "@nextui-org/react";
import { IconContext } from "react-icons/lib";
import { BsTrash3 } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import ModalRequestDetails from "./ModalRequestDetails";
import PleaseLogin from "./PleaseLogin";

// Main App Component
const DataTableOffers = () => {
  const [requests, setRequests] = useState([]);
  const [deleteRequest, setDeleteRequest] = useState(true);
  const [offers, setOffers] = useState([]);
  const [showLoginPage, setShowLoginPage] = useState(false); // to manage state when Axios fetch is having an error

  const navigate = useNavigate();

  useEffect(() => {
    const getOffers = async () => {
      try {
        const res = await axios.get(`${ENVConfig.API_ServerURL}/offers`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (res.data) {
          setOffers(res.data);
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

    getOffers();
  }, []);

  const deleteMyOfferById = async (id) => {
    try {
      await axios.delete(`${ENVConfig.API_ServerURL}/offers/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setRequests(offers.filter((offers) => offers._id !== id));
      setDeleteRequest(true);
    } catch (error) {
      console.log(error);
    }
  };

  const viewDetails = (id) => {
    navigate(`/offers-details/${id}`);
  };

  const statusLabels = {
    0: "Status 0",
    1: "Offer Sent",
    2: "Offer Rejected",
    3: "Offer Withdrawn",
    5: "Offer Accepted",
    7: "Offer Canceled",
    8: "In Progress",
    9: "Offer finished",
  };

  const columns = [
    { key: "oText", label: "OFFER TEXT" },
    { key: "oDate", label: "OFFERED DATE" },
    { key: "oStatus", label: "STATUS" },
    { key: "oUserId.username", label: "USERNAME" },
    { key: "actions", label: "ACTIONS" }, // New column for action buttons
  ];
  // If showLoginPage is true, render the PleaseLogin component
  if (showLoginPage) {
    return <PleaseLogin />;
  }

  return (
    <>
      <Table
        aria-label="Expandable table with dynamic content"
        className="fixed"
      >
        <TableHeader className="fixed" columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody items={offers}>
          {(item) => {
            console.log("Current item:", item); // Console log the item object here
            return (
              <TableRow key={item._id}>
                {(columnKey) => (
                  <TableCell>
                    {columnKey === "oStatus" ? (
                      statusLabels[item[columnKey]] || "Unknown Status"
                    ) : columnKey === "oDate" ? (
                      formatDate(item[columnKey])
                    ) : columnKey === "offerCount" ? (
                      item.offerId.length === 0 ? (
                        <ModalRequestDetails
                          offers={
                            item.offerId.length > 0
                              ? `${item.offerId.length} Offers`
                              : "No Offers"
                          }
                          isDisabled={item.offerId.length === 0} // Disable button if no offers
                        />
                      ) : (
                        "-"
                      ) // Count the number of offers
                    ) : columnKey === "oUserId.username" ? (
                      item[columnKey]
                    ) : columnKey === "actions" ? (
                      <div style={{ display: "flex", gap: "10px" }}>
                        <Button
                          auto
                          icon={<BsTrash3 />}
                          color="error"
                          onClick={() => deleteRequestById(item._id)}
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
            );
          }}
        </TableBody>
      </Table>
    </>
  );
};

export default DataTableOffers;
