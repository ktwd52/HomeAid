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
import { FcStart } from "react-icons/fc";
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
            params: { oStatus: { $in: [2, 5, 6, 7] } },
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

  const putInProgressById = async (item) => {
    try {
      await axios.put(
        `${ENVConfig.API_ServerURL}/offers/${item._id}/inprogress`,
        { oStatus: 7, requestId: item.requestId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(item);
      setOffers(offers.filter((offers) => offers._id !== item._id));
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
    5: "Offer Accepted",
    6: "Offer Canceled/Withdrawn",
    7: "Offer in Progress",
    9: "Offer finished",
  };

  const columns = [
    { key: "oStatus", label: "STATUS" },
    { key: "rText", label: "REQUEST TEXT" },
    { key: "oText", label: "OFFER TEXT" },
    { key: "rDate", label: "REQUEST DATE" },
    { key: "oDate", label: "OFFERED DATE" },
    { key: "oUserId", label: "USERNAME (REQ. BY)" },
    { key: "actions", label: "START OFFER / WITHDRAW" }, // New column for action buttons
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
                      <span
                        style={{
                          color:
                            item[columnKey] === 0
                              ? "#cccccc" //lightgray
                              : item[columnKey] === 1
                              ? "#996633" //brown
                              : item[columnKey] === 5
                              ? "#ff00ff"
                              : item[columnKey] === 6
                              ? "#ff3333"
                              : item[columnKey] === 7
                              ? "#66a3ff" // blue
                              : "inherit", // Default color if not Awaiting Offer or Offer Received
                        }}
                      >
                        {statusLabels[item[columnKey]] || "Unknown Status"}
                      </span>
                    ) : columnKey === "rText" ? (
                      item.requestId?.rText
                    ) : columnKey === "oDate" ? (
                      formatDate(item[columnKey])
                    ) : columnKey === "rDate" ? (
                      formatDate(item.requestId?.rDate)
                    ) : columnKey === "oUserId" ? (
                      item.oUserId ? (
                        item.oUserId.username
                      ) : (
                        "no username found"
                      )
                    ) : columnKey === "actions" ? (
                      <div style={{ display: "flex", gap: "10px" }}>
                        <Button
                          color="alert"
                          onClick={() => putInProgressById(item)}
                          className="text-[white] text-[2rem]"
                        >
                          {item?.oStatus === 5 ? FcStart() : ""}
                        </Button>

                        <Button
                          color="error"
                          onClick={() => deleteMyOfferById(item._id)}
                          className="text-[black] text-[1.25rem]"
                        >
                          {BsTrash3()}
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

export default UD_TaskLMyOffers;
