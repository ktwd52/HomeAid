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
import ENVConfig from "../../Utils/env.config";
import { useState, useEffect, useRef } from "react";

export default function Mod_RejectFeedback({ id, setOffers }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [feedback, setFeedback] = useState("");
  const textareaRef = useRef(null); // Create a ref for the Textarea

  useEffect(() => {
    if (isOpen && textareaRef.current) {
      textareaRef.current.focus(); // Focus the Textarea when the modal opens
    }
  }, [isOpen]);

  const handleReject = async (id, onClose) => {
    try {
      const res = await axios.put(
        `${ENVConfig.API_ServerURL}/offers/${id}/reject`,
        { oFeedbackText: feedback },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setOffers((prev) =>
        prev.filter((offer) => {
          console.log(offer, id);
          return offer._id !== id;
        })
      );
      onClose();
    } catch (error) {
      console.log(error);
    }
    console.log("Offer Rejected:", id);
  };

  return (
    <>
      <Button onPress={onOpen}>&#10060; {/* Rejecting */}</Button>
      <Modal size="md" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 w-5/6">
                {`Send feedback to the offering user about your rejection cause`}
              </ModalHeader>
              <ModalBody>
                <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                  <Textarea
                    onChange={(e) => setFeedback(e.target.value)}
                    isRequired
                    label="Why do you reject the offer?"
                    labelPlacement="outside"
                    placeholder="Please enter your main cause(s) for rejecting this offer: max (3 rows)"
                    className="max-w-xs"
                    maxRows={3}
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
                  onPress={() => handleReject(id, onClose)}
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
