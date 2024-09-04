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
import { FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Mod_OfferHelp from "./Mod_OfferHelp";
import PleaseLogin from "../PleaseLogin";
import { AuthContext } from "../../context/AuthProvider";

// Data Table for All Requests where rStatus < 2
const UD_OfferHelp = () => {
  const [requests, setRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
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
      setIsLoading(false);
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
    6: "Request deleted",
    7: "Request in Progress",
    9: "Finished",
  };

  const columns = [
    { key: "rStatus", label: "STATUS" },
    { key: "rUserId.username", label: "USERNAME" },
    { key: "rCategory", label: "CATEGORY" },
    { key: "rText", label: "REQUEST TEXT" },
    { key: "rDate", label: "REQ. DATE" },
    { key: "rImage", label: "PICTURE(S)" },
    { key: "offerCount", label: "# of OFFERS" },
    { key: "actions", label: "OFFER HELP" },
  ];

  // If showLoginPage is true, render the PleaseLogin component
  if (showLoginPage) {
    return <PleaseLogin />;
  }

  return (
    <div className="">
      <Table
        isHeaderSticky
        color="primary"
        selectionMode="single"
        defaultSelectedKeys={["2"]}
        isStriped
        className={{
          wrapper: "max-h-[382px]",
        }}
        aria-label="Expandable table with dynamic content"
      >
        <TableHeader>
          {columns.map((column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          ))}
        </TableHeader>
        <TableBody
          items={requests}
          emptyContent={"No Requests to display."}
          isLoading={isLoading}
          loadingContent={<Spinner label="Loading..." />}
        >
          {requests.map((item) => (
            <TableRow key={item._id}>
              {columns.map((column) => (
                <TableCell key={column.key}>
                  {column.key === "rStatus" ? (
                    <span
                      style={{
                        color:
                          item[column.key] === 0
                            ? "orange"
                            : item[column.key] === 1
                            ? "green"
                            : "inherit",
                      }}
                    >
                      {statusLabels[item[column.key]] || "Unknown Status"}
                    </span>
                  ) : column.key === "rDate" ? (
                    formatDate(item[column.key])
                  ) : column.key === "offerCount" ? (
                    item[column.key]
                  ) : column.key === "rImage" ? (
                    item.rImage.length > 0 ? (
                      "Image available"
                    ) : (
                      "No image available"
                    )
                  ) : column.key === "actions" ? (
                    <div style={{ display: "flex", gap: "10px" }}>
                      <Mod_OfferHelp
                        id={item._id}
                        isDisabled={item.offerId ? true : false}
                      />
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
                    item[column.key]
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UD_OfferHelp;
