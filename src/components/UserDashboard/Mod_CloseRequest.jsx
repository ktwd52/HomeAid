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
import { Rating } from "@smastrom/react-rating";
import { useState, useContext } from "react";

export default function Mod_CloseRequest({ id, setRequest }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(0); // Initial value

  // const { user } = useContext(AuthContext);

  const handleClosingRequest = async (id, onClose) => {
    try {
      console.log("rating: ", rating);
      const res = await axios.put(
        `${ENVConfig.API_ServerURL}/offers/${id}/close`,
        { oFeedbackText: feedback, oRating: rating },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setRequest((prev) => prev.filter((request) => request._id !== id));
      onClose();
    } catch (error) {
      console.log(error);
    }
    console.log(`Request: ${id} and its Offer closed`);
  };

  return (
    <>
      <Button color="success" onPress={onOpen}>
        {" "}
        Close Request
      </Button>
      <Modal size="md" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 w-5/6">
                {`Feedback / Comment`}
              </ModalHeader>
              <ModalBody>
                <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                  <Textarea
                    onChange={(e) => setFeedback(e.target.value)}
                    isRequired
                    label="Do you have any feedback?"
                    labelPlacement="outside"
                    placeholder="Please enter your comment or feedback: max (4 rows)"
                    className="max-w-xs"
                    maxRows={4}
                  />
                </div>
                <Rating
                  style={{ maxWidth: 250 }}
                  value={rating}
                  onChange={setRating}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  size="sm"
                  color="primary"
                  onPress={() => handleClosingRequest(id, onClose)}
                >
                  Request Solved
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
