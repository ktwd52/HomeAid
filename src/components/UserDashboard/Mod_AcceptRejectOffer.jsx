import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
} from "@nextui-org/react";
import axios from "axios";
import { useState, useEffect } from "react";
import ENVConfig from "../../Utils/env.config";
import formatDate from "../../Utils/formatDate";
import PleaseLogin from "../PleaseLogin";
import { BsTrash3 } from "react-icons/bs"; // Assuming you want to use BsTrash3 from react-icons
import Mod_RejectFeedback from "./Mod_RejectFeedback";

export default function Mod_AccepRejectOffer({ id, isDisabled, setRequests }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [offers, setOffers] = useState([]);
  const [showLoginPage, setShowLoginPage] = useState(false);

  useEffect(() => {
    const getOffers = async () => {
      try {
        const res = await axios.get(
          `${ENVConfig.API_ServerURL}/offers?requestId=${id}&oStatus=1`,
          {
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
  }, [id]); // Ensure useEffect depends on `id`

  const handleAccept = async (item, onClose) => {
    try {
      const res = await axios.put(
        `${ENVConfig.API_ServerURL}/offers/${item._id}/accept`,
        { requestId: item.requestId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data) {
        setOffers([]);
        setRequests((prev) => {
          return prev.filter((request) => request._id !== item.requestId);
        });
        onClose();
        // console.log(res.data);
      }
    } catch (error) {
      console.log(error);
    }
    console.log("Offer Accepted:");
  };

  const deleteMyOfferById = async (offerId) => {
    try {
      await axios.delete(`${ENVConfig.API_ServerURL}/offers/${offerId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setOffers(offers.filter((offer) => offer._id !== offerId));
    } catch (error) {
      console.log(error);
    }
  };

  const statusLabels = {
    0: "Status 0",
    1: "Offer Sent",
    2: "Offer Rejected",
    3: "Offer Withdrawn",
    5: "Offer Accepted",
    7: "Offer Canceled",
    8: "In Progress",
    9: "Offer Finished",
  };

  const columns = [
    { key: "oText", label: "OFFER TEXT" },
    { key: "oDate", label: "OFFERED DATE" },
    { key: "oStatus", label: "STATUS" },
    { key: "oUserId", label: "USERNAME (OFF. HELP)" },
    { key: "actions", label: "ACCEPT OFFER | REJECT OFFER" }, // New column for action buttons
  ];

  if (showLoginPage) {
    return <PleaseLogin />;
  }

  return (
    <>
      <Button
        onPress={onOpen}
        color={offers?.length ? "success" : "inherit"}
        isDisabled={!offers?.length} // Disable the button when offers are undefined or empty
      >
        {offers.length ? offers.length : ""}
      </Button>
      <Modal
        size="5xl"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        orientation="center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 w-5/6">
                {`Offer Details`}
              </ModalHeader>
              <ModalBody>
                <Table aria-label="Expandable table with dynamic content">
                  <TableHeader columns={columns}>
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
                                  {statusLabels[item[columnKey]] ||
                                    "Unknown Status"}
                                </span>
                              ) : columnKey === "oDate" ? (
                                formatDate(item[columnKey])
                              ) : columnKey === "oUserId" ? (
                                item.oUserId ? (
                                  item.oUserId.username
                                ) : (
                                  "no username found"
                                )
                              ) : columnKey === "actions" ? (
                                <div style={{ display: "flex", gap: "2px" }}>
                                  <Button
                                    size="md"
                                    color="inherit"
                                    onPress={() => handleAccept(item, onClose)}
                                    className="text-[1.25rem]"
                                  >
                                    &#9989; {/* Accepting */}
                                  </Button>
                                  <Mod_RejectFeedback
                                    id={item._id}
                                    setOffers={setOffers}
                                  />
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
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
