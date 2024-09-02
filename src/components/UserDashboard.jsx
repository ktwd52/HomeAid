import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import UD_MyRequests from "./UserDashboard/UD_MyRequests.jsx";
import UD_MyRequests_nextUI from "./UserDashboard/UD_MyRequests_nextUI.jsx";
import UD_OfferHelp from "./UserDashboard/UD_OfferHelp.jsx";
import UD_TaskLMyOffers from "./UserDashboard/UD_TaskLMyOffers.jsx";
import UD_TaskLMyRequests from "./UserDashboard/UD_TaskLMyRequests.jsx";
import UseCaseTable from "./exampleNextUI/UseCaseTable.jsx";
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";

const UserDashboard = () => {
  const { user } = useContext(AuthContext); // Move useContext inside the component

  return (
    <div className="pt-4">
      <Tabs
        // disabledKeys={
        //   user.isOfferingHelp ? ["offers", "inactive"] : ["inactive"]
        // }
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
          <UD_OfferHelp />
        </Tab>
        <Tab key="myOtasks" title="My Offered Tasklist">
          <div> My Offered Task List to be done</div>
          <UD_TaskLMyOffers />
        </Tab>
        <Tab key="myRtasks" title="My Requested Tasklist">
          <div>My Requested Task List In Progress waiting to complete</div>
          <UD_TaskLMyRequests />
        </Tab>
        <Tab key="metrics" title="Metrics">
          <p>Metrics Diagrams etc....</p>
        </Tab>
        <Tab key="inactive" title="Inactive TBD">
          <UD_MyRequests_nextUI />
        </Tab>
        <Tab key="1" title="UseCaseTable">
          <UseCaseTable />
        </Tab>
      </Tabs>
    </div>
  );
};

export default UserDashboard;
