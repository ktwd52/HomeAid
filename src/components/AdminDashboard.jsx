import { Tabs, Tab } from "@nextui-org/react";
import UD_manageAdmin from "./UserDashboard/UD_manageAdmin.jsx";
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";

const AdminDashboard = () => {
  const { user } = useContext(AuthContext); // Move useContext inside the component

  return (
    <div
      className="relative bg-cover w-full h-full"
      style={{
        backgroundImage: "url('/img/background/ud-background-1.png')",
        backgroundRepeat: "center",
        opacity: 0.9, // Set opacity to 90%
      }}
    >
      <div className="absolute inset-0 bg-cover bg-center"></div>
      <Tabs
        className=" font-bold "
        aria-label="Disabled Options"
        color="primary"
      >
        <Tab
          key="allopenrequests"
          title="Accept Offer(s) for my Request(s)"
          className=""
        >
          <div className="h-[1000px]">
            <h3 className="text-center text-green-700 font-extrabold">
              Below you can see all of your requests awaiting for an offer or
              waiting for accepting an offer. Please accept offers as soon as
              possible, so your issue could be solved quickly
            </h3>
            {/* <UD_OfferHelp /> */}
          </div>
        </Tab>
        <Tab key="setadmin" title="Manage Admins" color="primary">
          <h3 className="text-center text-green-700 font-extrabold">
            Below you can see all of the users who asked for admin rights,
            please accept or reject their request.
          </h3>

          <div className="h-[1000px]">
            <UD_manageAdmin />
          </div>
        </Tab>

        <Tab isDisabled key="metrics" title="Metrics / KPI">
          <div className="h-[1000px]">
            <p>Metrics Diagrams etc....</p>
          </div>
        </Tab>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
