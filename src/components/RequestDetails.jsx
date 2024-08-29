import axios from "axios";
import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { Button } from "@nextui-org/react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import formatDate from "../Utils/formatDate";

const RequestDetails = () => {
  const [requests, setRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

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

  const handleDelete = async (requestId) => {
    try {
      await axios.delete(`${ENVConfig.API_ServerURL}/requests/${requestId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setRequests(requests.filter((request) => request._id !== requestId));
    } catch (error) {
      console.log(error);
    }
  };

  const handleViewDetails = (requestId) => {
    const request = requests.find((req) => req._id === requestId);
    setSelectedRequest(request);
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setSelectedRequest(null);
  };

  const statusLabels = {
    0: "Awaiting Offer",
    1: "Offer Received",
    5: "Offer Accepted",
    6: "In Progress",
    9: "Finished",
  };

  const columns = [
    { headerName: "Request Category", field: "rCategory" },
    { headerName: "Request Text", field: "rText" },
    {
      headerName: "Request Date",
      field: "rDate",
      valueFormatter: ({ value }) => formatDate(value),
    },
    {
      headerName: "Status",
      field: "rStatus",
      valueFormatter: ({ value }) => statusLabels[value],
    },
    {
      headerName: "Offer Count",
      field: "offerCount",
      valueGetter: (params) => params.data.offerId.length,
    },
    {
      headerName: "Actions",
      field: "actions",
      cellRendererFramework: (params) => (
        <div>
          <Button
            size="xs"
            auto
            color="error"
            onClick={() => handleDelete(params.data._id)}
          >
            🗑️
          </Button>
          <Button
            size="xs"
            auto
            color="primary"
            onClick={() => handleViewDetails(params.data._id)}
          >
            🔍
          </Button>
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="ag-theme-alpine" style={{ height: 400, width: "100%" }}>
        <AgGridReact
          rowData={requests}
          columnDefs={columns}
          domLayout="autoHeight"
        />
      </div>

      {isModalVisible && (
        <RequestDetails
          request={selectedRequest}
          onClose={handleCloseModal}
          onDelete={handleDelete}
          onViewDetails={() => {}}
        />
      )}
    </>
  );
};

export default RequestDetails;
