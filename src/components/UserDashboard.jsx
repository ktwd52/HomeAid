import { Tabs, Tab, Card, CardBody, CardHeader } from "@nextui-org/react";
import DataTableRequest from "./DataTableRequest";
import DataTableOffers from "./DataTableOffers";

const UserDashboard = () => {
  return (
    <>
      <div className="flex w-full flex-col">
        <Tabs disabledKeys={["inactive"]} aria-label="Disabled Options">
          <Tab key="allopenrequests" title="My Pending Requests">
            <Card>
              <CardBody>
                <DataTableRequest />
              </CardBody>
            </Card>
          </Tab>
          <Tab key="offers" title="Offer Help">
            <Card>
              <CardBody>
                <DataTableOffers />
              </CardBody>
            </Card>
          </Tab>
          <Tab key="mytasks" title="My Tasklist">
            <Card>
              <CardBody>My Requests</CardBody>
            </Card>
          </Tab>
          <Tab key="metrics" title="Metrics ">
            <Card>
              <CardBody>Metrics Diagrams etc....</CardBody>
            </Card>
          </Tab>
          <Tab key="inactive" title="Inactive TBD">
            <Card>
              <CardBody>...</CardBody>
            </Card>
          </Tab>
        </Tabs>
      </div>
    </>
  );
};

export default UserDashboard;
