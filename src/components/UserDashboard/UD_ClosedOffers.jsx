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
import { IconContext } from "react-icons/lib";
import { BsTrash3 } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import Mod_OfferDetails from "./Mod_OfferDetails";
import PleaseLogin from "../PleaseLogin";
import { AuthContext } from "../../context/AuthProvider";

// Main App Component
const UD_TaskLMyOffers = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [offers, setOffers] = useState([]);
  const [showLoginPage, setShowLoginPage] = useState(false); // to manage state when Axios fetch is having an error
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    const getOffers = async () => {
      try {
        const res = await axios.get(
          `${ENVConfig.API_ServerURL}/offers?oUserId=${user._id}`,
          {
            params: { oStatus: { $in: [6, 9] } },
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (res.data) {
          setOffers(res.data);
          console.log(res.data);
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
      setIsLoading(false);
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
      setOffers(offers.filter((offers) => offers._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const putInProgressById = async (id) => {
    console.log("id: ", id);
    try {
      await axios.put(
        `${ENVConfig.API_ServerURL}/offers/${id}/inprogress`,
        { oStatus: 7 },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setOffers(offers.filter((offers) => offers._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const viewDetails = (id) => {
    navigate(`/offers-details/${id}`);
  };

  const statusLabels = {
    1: "Offer Sent",
    2: "Offer Rejected",
    3: "Offer Canceled",
    4: "Offer Withdrawn",
    5: "Offer Accepted",
    7: "In Progress",
    9: "Offer finished",
  };

  const columns = [
    { key: "oStatus", label: "STATUS" },
    { key: "oText", label: "OFFER TEXT" },
    { key: "oDate", label: "DEADLINE OFFERED" },
    { key: "requestId.rUserId.username", label: "USERNAME REQUESTED" },
  ];
  // If showLoginPage is true, render the PleaseLogin component
  if (showLoginPage) {
    return <PleaseLogin />;
  }

  return (
    <>
      <Table
        isHeaderSticky
        color="primary"
        selectionMode="single"
        defaultSelectedKeys={["2"]}
        isStriped
        aria-label="HomeAid App Offer Table"
        className=""
      >
        <TableHeader className="" columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody
          emptyContent={"No Offered tasks to display."}
          items={offers}
          isLoading={isLoading}
          loadingContent={<Spinner label="Loading..." />}
        >
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
                        <Mod_OfferDetails
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

export default UD_TaskLMyOffers;
