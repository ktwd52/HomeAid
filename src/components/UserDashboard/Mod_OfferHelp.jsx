import ENVConfig from "../../Utils/env.config"; // Adjust the import path to your actual configuration
import { useState, useContext } from "react";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { AuthContext } from "../../context/AuthProvider";
import { today, getLocalTimeZone } from "@internationalized/date"; // Assuming you are using a date library
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Calendar,
  Textarea,
  Button,
  useDisclosure,
} from "@nextui-org/react";

export default function Mod_OfferHelp({ id, isDisabled }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [offerDate, setOfferDate] = useState(today(getLocalTimeZone()));
  const [offerText, setOfferText] = useState("");
  const { user } = useContext(AuthContext);

  // Toast Message setup
  const showToast = (message, type = "error") => {
    toast(message, { type });
  };

  const sendOffer = async () => {
    if (!offerText) {
      return console.error("Offer Text is required");
    }
    console.log({
      oText: offerText,
      oDate: offerDate.toString(), // Ensure it's correctly formatted
      oUserId: user._id,
      requestId: id,
    });
    try {
      const res = await axios.post(
        `${ENVConfig.API_ServerURL}/offers`,
        {
          oText: offerText,
          oDate: offerDate.toString(), // Ensure it's correctly formatted
          oUserId: user._id,
          requestId: id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      console.log("Offer Sent:", res.data);
      showToast("Offer Sent:", "success");
    } catch (error) {
      showToast("Error sending offer:", error);
      console.error("Error sending offer:", error);
    }
  };

  return (
    <>
      <ToastContainer />
      <Button onPress={onOpen} disabled={isDisabled}>
        Offer Help
      </Button>
      <Modal size="5xl" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Offering Help for the Request
              </ModalHeader>
              <ModalBody>
                <div className="flex justify-items-start">
                  <label htmlFor="oText">
                    Offer Description:
                    <Textarea
                      onChange={(e) => setOfferText(e.target.value)}
                      isRequired="true"
                      label="How can you help?"
                      labelPlacement="outside"
                      placeholder="Please enter your offer description: max (3 rows)"
                      className="max-w-xs"
                      maxRows={3}
                      value={offerText}
                    />
                  </label>
                  Offer Date:
                  <label htmlFor="oDate">
                    <Calendar
                      aria-label="Date"
                      onChange={setOfferDate} // Set date directly
                      defaultValue={offerDate}
                      minValue={today(getLocalTimeZone())} // Set min value to today
                      maxValue={today(getLocalTimeZone()).add({ days: 90 })} // Max 90 days from today
                    />
                  </label>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="primary"
                  onPress={() => sendOffer(onClose())} // Pass function reference
                >
                  Send Offer
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
