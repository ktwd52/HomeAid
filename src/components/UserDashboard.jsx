import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import UD_MyRequests from "./UserDashboard/UD_MyRequests.jsx";
import UD_OfferHelp from "./UserDashboard/UD_OfferHelp.jsx";
import UD_TaskLMyOffers from "./UserDashboard/UD_TaskLMyOffers.jsx";
import UD_TaskLMyRequests from "./UserDashboard/UD_TaskLMyRequests.jsx";
import UseCaseTable from "./exampleNextUI/UseCaseTable.jsx";
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";

const UserDashboard = () => {
  const { user } = useContext(AuthContext); // Move useContext inside the component

  return (
    <div className="l">
      <Tabs
        disabledKeys={
          user.isOfferingHelp ? ["offers", "inactive"] : ["inactive"]
        }
        aria-label="Disabled Options"
      >
        <Tab key="allopenrequests" title="My Pending Requests">
          <Card>
            <CardBody>
              <UD_MyRequests />
            </CardBody>
          </Card>
        </Tab>
        <Tab key="offers" title="Offer Help">
          <Card>
            <CardBody>
              <UD_OfferHelp />
            </CardBody>
          </Card>
        </Tab>
        <Tab key="mytasks" title="My Tasklist">
          <Card>
            <CardBody className="flex">
              <UD_TaskLMyOffers />
              <UD_TaskLMyRequests />
            </CardBody>
          </Card>
        </Tab>
        <Tab key="metrics" title="Metrics">
          <Card>
            <CardBody>Metrics Diagrams etc....</CardBody>
          </Card>
        </Tab>
        <Tab key="inactive" title="Inactive TBD">
          <Card>
            <CardBody>...</CardBody>
          </Card>
        </Tab>
        <Tab key="1" title="UseCaseTable">
          <Card>
            <UseCaseTable />
          </Card>
        </Tab>
      </Tabs>
    </div>
  );
};

export default UserDashboard;
