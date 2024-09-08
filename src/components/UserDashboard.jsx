import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import UD_MyRequests from "./UserDashboard/UD_MyRequests.jsx";
import UD_OfferHelp from "./UserDashboard/UD_OfferHelp.jsx";
import UD_TaskLMyOffers from "./UserDashboard/UD_TaskLMyOffers.jsx";
import UD_TaskLMyRequests from "./UserDashboard/UD_TaskLMyRequests.jsx";
import UD_ClosedOffers from "./UserDashboard/UD_ClosedOffers.jsx";
import UD_ClosedRequests from "./UserDashboard/UD_ClosedRequests.jsx";
import UpdateProfile from "./Profile.jsx";
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import AD_ManageAdmin from "./AdminDashboard/AD_ManageAdmin.jsx";

const UserDashboard = () => {
  const { user } = useContext(AuthContext); // Move useContext inside the component

  return (
    <div
      className="relative bg-cover w-full h-full"
      style={{
        backgroundImage: "url('/img/background/ud-background.png')",
        backgroundRepeat: "center",
        opacity: 0.9, // Set opacity to 20%
      }}
    >
      <div className="absolute inset-0 bg-cover bg-center"></div>
      <Tabs
        className=" font-bold "
        aria-label="Disabled Options"
        color="primary"
      >
        <Tab
          key="myopenrequests"
          title="Accept Offer(s) for my Request(s)"
          className=""
        >
          <div className="h-[1000px]">
            <h3 className="text-center text-green-700 font-extrabold">
              Below you can see all of your requests awaiting for an offer or
              waiting for accepting an offer. Please accept offers as soon as
              possible, so your issue could be solved quickly
            </h3>
            <UD_MyRequests />
          </div>
        </Tab>
        <Tab key="myRtasks" title="Track My Request(s)" color="primary">
          <h3 className="text-center text-green-700 font-extrabold">
            Below you can see all of your requests waiting to Start or allready
            in Progress, please click on the close button and rate the offer
            when your request was done
          </h3>

          <div className="h-[1000px]">
            <UD_TaskLMyRequests />
          </div>
        </Tab>
        <Tab
          key="myClosedRequests"
          title="My closed Request(s)"
          color="primary"
        >
          <h3 className="text-center text-green-700 font-extrabold">
            Below you can see your closed Requests
          </h3>
          <div className="h-[1000px]">
            <UD_ClosedRequests />
          </div>
        </Tab>
        <Tab key="allopenrequest" title="Select a Request and Offer Help">
          <div className="h-[1000px]">
            <h3 className="text-center text-green-700 font-extrabold">
              Below you can see all Requests where no offer was received or
              accepted yet : If you are able to help please press the Offer Help
              button and send your offer to the requester
            </h3>
            <UD_OfferHelp />
          </div>
        </Tab>
        <Tab key="myOtasks" title="My Tasklist (Offers to be done)">
          <h3 className="text-center text-green-700 font-extrabold">
            Below you can see your accepted Offers: please press the start
            button of each offer to inform the requestor
          </h3>
          <div className="h-[1000px]">
            <UD_TaskLMyOffers />
          </div>
        </Tab>
        <Tab key="myClosedOffers" title="My closed Offer(s)">
          <h3 className="text-center text-green-700 font-extrabold">
            Below you can see your closed / rejected Offers
          </h3>
          <div className="h-[1000px]">
            <UD_ClosedOffers />
          </div>
        </Tab>

        <Tab isDisabled key="metrics" title="Metrics / KPI">
          <div className="h-[1000px]">
            <p>Metrics Diagrams etc....</p>
          </div>
        </Tab>
        <Tab key="rendertest" title="JSXComponentTest" color="primary">
          <div>
            <UpdateProfile />
            <AD_ManageAdmin />
          </div>
        </Tab>
      </Tabs>
    </div>
  );
};

export default UserDashboard;
