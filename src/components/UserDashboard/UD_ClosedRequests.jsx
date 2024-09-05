// Track accepted Offer(s)
import ENVConfig from "../../Utils/env.config.js";
import axios from "axios";
import formatDate from "../../Utils/formatDate.js";
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
import Mod_CloseRequest from "./Mod_CloseRequest.jsx";
import Mod_RequestDetails from "./Mod_RequestDetails.jsx";
import PleaseLogin from "../PleaseLogin.jsx";
import { AuthContext } from "../../context/AuthProvider.jsx";

//Data Table for logged in user Requests where rStatus < 2
const UD_TaskLMyRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showLoginPage, setShowLoginPage] = useState(false); // to manage state when Axios fetch is having an error
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    const getRequests = async () => {
      try {
        const res = await axios.get(
          `${ENVConfig.API_ServerURL}/requests?rUserId=${user._id}`,
          {
            params: { rStatus: { $in: [6, 9] } },
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
      setLoading(false);
    };

    getRequests();
  }, []);

  const statusLabels = {
    0: "Awaiting Offer",
    1: "Offer Received",
    5: "Offer Accepted",
    6: "Request deleted",
    7: "In Progress",
    9: "Request Finished",
  };

  const columns = [
    { key: "rStatus", label: "STATUS" },
    { key: "rCategory", label: "REQUEST CATEGORY" },
    { key: "rText", label: "REQUEST TEXT" },
    { key: "oText", label: "OFFER TEXT" },
    { key: "rDate", label: "REQUEST DATE" },
    { key: "oDate", label: "OFFER DATE" },
    { key: "actions", label: "CLOSE REQUEST" }, // New column for action buttons
  ];
  // If showLoginPage is true, render the PleaseLogin component
  if (showLoginPage) {
    return <PleaseLogin />;
  }

  return (
    <div className="">
      <Table
        aria-label="Expandable table with dynamic content"
        isHeaderSticky
        color="primary"
        selectionMode="single"
        defaultSelectedKeys={["2"]}
        isStriped
      >
        <TableHeader className="">
          {columns.map((column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          ))}
        </TableHeader>
        <TableBody
          items={requests}
          emptyContent={"No closed Requests to display."}
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
                            ? "#cccccc" //lightgray
                            : item[column.key] === 1
                            ? "#996633" //brown
                            : item[column.key] === 5
                            ? "#ff00ff"
                            : item[column.key] === 6
                            ? "#ff3333"
                            : item[column.key] === 7
                            ? "#66a3ff" // blue
                            : "inherit", // Default color if not Awaiting Offer or Offer Received
                      }}
                    >
                      {statusLabels[item[column.key]] || "Unknown Status"}
                    </span>
                  ) : column.key === "rDate" ? (
                    formatDate(item[column.key])
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

export default UD_TaskLMyRequests;
