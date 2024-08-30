import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Textarea,
  Button,
} from "@nextui-org/react";
import axios from "axios";
import { useState, useEffect } from "react";

export default function ModalOfferFeedbackText({ item }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [feedback, setFeedback] = useState("");

  const handleReject = async (item) => {
    try {
      const res = await axios.put(
        `${ENVConfig.API_ServerURL}/offers/${item._id}/reject`,
        { oFeedbackText: item.oFeedbackText },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data) {
        setFeedback(item.oFeedbackText);
        console.log(item.oFeedbackText);
        console.log(res.data);
      }
    } catch (error) {
      console.log(error);
    }
    console.log("Offer Rejected:", item);
  };

  return (
    <>
      <Button onPress={onOpen}>&#10060; {/* Rejecting */}</Button>
      <Modal size="5xl" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 w-5/6">
                {`Feedback for Rejecting an Offer`}
              </ModalHeader>
              <ModalBody>
                <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                  <Textarea
                    isRequired
                    label="Cause of Rejection:"
                    labelPlacement="outside"
                    placeholder="Please enter your main cause(s) for rejecting this offer:"
                    className="max-w-xs"
                    maxRows={4}
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  size="sm"
                  color="primary"
                  onPress={(() => handleReject(item), onClose)}
                >
                  Reject Offer
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
