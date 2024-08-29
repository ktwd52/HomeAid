import { Tabs, Tab, Card, CardBody, CardHeader } from "@nextui-org/react";
import DataTableRequest from "./DataTableRequest";

const UserDashboard = () => {
  return (
    <>
      <div className="flex w-full flex-col">
        <Tabs disabledKeys={["music"]} aria-label="Disabled Options">
          <Tab key="allopenrequests" title="My Open Requests">
            <Card>
              <CardBody>
                <DataTableRequest />
              </CardBody>
            </Card>
          </Tab>
          <Tab key="offers" title="Offer Help">
            <Card>
              <CardBody>
                Ut enim ad minim veniam, quis nostrud exercitation ullamco
                laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
                dolor in reprehenderit in voluptate velit esse cillum dolore eu
                fugiat nulla pariatur.
              </CardBody>
            </Card>
          </Tab>
          <Tab key="myrequests" title="My Requests">
            <Card>
              <CardBody>
                Excepteur sint occaecat cupidatat non proident, sunt in culpa
                qui officia deserunt mollit anim id est laborum.
              </CardBody>
            </Card>
          </Tab>
        </Tabs>
      </div>
    </>
  );
};

export default UserDashboard;
