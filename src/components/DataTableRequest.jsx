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
import { FaTrash, FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

// Main App Component
const DataTableRequest = () => {
  const [requests, setRequests] = useState([]);
  const [deleteRequest, setDeleteRequest] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const getRequests = async () => {
      try {
        const res = await axios.get(`${ENVConfig.API_ServerURL}/requests`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (res.data) {
          setRequests(res.data);
        }
      } catch (error) {
        console.log(error);
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
      console.log(`${ENVConfig.API_ServerURL}/requests/${id}`);
      setRequests(requests.filter((request) => request._id !== id));
      setDeleteRequest(true);
    } catch (error) {
      console.log(error);
    }
  };

  const viewDetails = (id) => {
    navigate(`/request-details/${id}`);
  };

  const statusLabels = {
    0: "Awaiting Offer",
    1: "Offer Received",
    5: "Offer Accepted",
    3: "In Progress",
    9: "Finished",
  };

  const columns = [
    { key: "rCategory", label: "REQUEST CATEGORY" },
    { key: "rText", label: "REQUEST TEXT" },
    { key: "rDate", label: "REQUEST DATE" },
    { key: "rImage.Length()", label: "REQUEST IMAGE(ES)" },
    { key: "rStatus", label: "STATUS" },
    { key: "offerCount", label: "OFFER COUNT" },
    { key: "actions", label: "ACTIONS" }, // New column for action buttons
  ];

  return (
    <Table aria-label="Expandable table with dynamic content">
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
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
                  item.offerId.length // Count the number of offers
                ) : columnKey === "rImage" ? (
                  item.rImage.length > 0 ? ( // Count the number of Images
                    "Image available" // If there are images
                  ) : (
                    "No image available"
                  ) // If there are no images
                ) : columnKey === "actions" ? (
                  <div style={{ display: "flex", gap: "10px" }}>
                    <Button
                      auto
                      icon={<FaEye />}
                      onClick={() => viewDetails(item._id)}
                    >
                      Details
                    </Button>
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
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default DataTableRequest;
