import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Slider,
  Textarea,
  Button,
} from "@nextui-org/react";
import axios from "axios";
import ENVConfig from "../../Utils/env.config";
import { useState, useContext } from "react";

export default function Mod_CloseRequest({ id, setRequest }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(0);
  // const { user } = useContext(AuthContext);

  const handleClosingRequest = async (id, onClose) => {
    try {
      const res = await axios.put(
        `${ENVConfig.API_ServerURL}/requests/${id}/close`,
        { oFeedbackText: feedback, oRating: rating },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      onClose();
    } catch (error) {
      console.log(error);
    }
    console.log(`Request: ${id} and Offer closed`);
  };

  return (
    <>
      <Button onPress={onOpen}> Close Request</Button>
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
                    label="Do you have any feedback related to you request and the offer?"
                    labelPlacement="outside"
                    placeholder="Please enter your feedback: max (4 rows)"
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
                  onPress={() => handleClosingRequest(id, onClose)}
                >
                  Request Finalized
                </Button>

                <Slider
                  label="Rating the Offere"
                  step={0.5}
                  maxValue={5}
                  minValue={0}
                  defaultValue={[2.5]}
                  showSteps={true}
                  showTooltip={true}
                  showOutline={true}
                  disableThumbScale={true}
                  value={setRating()}
                  classNames={{
                    base: "max-w-md",
                    filler:
                      "bg-gradient-to-r from-primary-500 to-secondary-400",
                    labelWrapper: "mb-2",
                    label: "font-medium text-default-700 text-medium",
                    value: "font-medium text-default-500 text-small",
                    thumb: [
                      "transition-size",
                      "bg-gradient-to-r from-secondary-400 to-primary-500",
                      "data-[dragging=true]:shadow-lg data-[dragging=true]:shadow-black/20",
                      "data-[dragging=true]:w-7 data-[dragging=true]:h-7 data-[dragging=true]:after:h-6 data-[dragging=true]:after:w-6",
                    ],
                    step: "data-[in-range=true]:bg-black/30 dark:data-[in-range=true]:bg-white/50",
                  }}
                />
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
