import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableColumn,
} from "@nextui-org/react"; // Assuming you're using NextUI's Table component
import { Button, Spinner } from "@nextui-org/react";
import { FcStart } from "react-icons/fc";
import { useState, useEffect } from "react";
import axios from "axios";
import ENVConfig from "../../Utils/env.config";

export default function AD_ManageAdmin() {
  const [allUsers, setAllUsers] = useState([{}]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeUsers, setActiveUsers] = useState([]);

  // Fetch all users
  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const res = await axios.get(
          `${ENVConfig.API_ServerURL}/admin/allusers`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (res.data) {
          setAllUsers(res.data);
          console.log("allUsers:", res.data);
        }
      } catch (error) {
        handleAxiosError(error);
      }
      setIsLoading(false);
    };
    getAllUsers();
  }, []);

  // Fetch active users by role
  useEffect(() => {
    const getActiveUsersByRole = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(
          `${ENVConfig.API_ServerURL}/admin/getactiveusersbyrole`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (res.data) {
          setActiveUsers(res.data.result);
          console.log("activeUsers:", res.data.result);
        }
      } catch (error) {
        handleAxiosError(error);
      }
      setIsLoading(false);
    };
    getActiveUsersByRole();
  }, []);

  const handleAxiosError = (error) => {
    if (error.response) {
      console.error(`(${error.response.status}) ${error.response.data.error}`);
    } else {
      console.log("An unknown error occurred:", error);
    }
  };

  // grant Admin right
  const grantAdminRights = async (userId) => {
    console.log("Admin rights granted for user ID:", userId);
  };

  // Calculate user stats
  const totalUsers =
    (activeUsers[0]?.total || "") +
    (activeUsers[1]?.total || "") +
    (activeUsers[2]?.total || "");
  const adminRequests = activeUsers[1]?.total || "";
  const adminUsers = activeUsers[2]?.total || "";

  const columns = [
    { key: "_id", label: "USER ID" },
    { key: "username", label: "USERNAME" },
    { key: "email", label: "EMAIL" },
    { key: "role", label: "ROLE" },
    { key: "isAdmin", label: "ADMIN STATUS" },
    { key: "actions", label: "GRANT ADMIN RIGHTS" },
  ];

  return (
    <div className="">
      {/* Summary Section */}
      <div className="flex justify-between mb-4">
        <h3>Total Users: {allUsers.length}</h3>
        <h3>Users Asking for Admin Rights: {adminRequests}</h3>
        <h3>Admin Users: {adminUsers}</h3>
      </div>

      {/* Table Section */}
      <Table
        isHeaderSticky
        color="primary"
        selectionMode="single"
        isStriped
        className={{
          wrapper: "max-h-[382px]",
        }}
        aria-label="Expandable table with dynamic content"
      >
        <TableHeader>
          {columns.map((column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          ))}
        </TableHeader>

        <TableBody
          items={allUsers} // Default to an empty array if allUsers is undefined
          emptyContent={"No Users to display."}
          isLoading={isLoading}
          loadingContent={<Spinner label="Loading..." />}
        >
          {allUsers.map((item) => (
            <TableRow key={item._id}>
              {columns.map((column) => (
                <TableCell key={column.key}>
                  {column.key === "isAdmin" ? (
                    item.role === "admin" && item.isAdmin ? (
                      <span className="text-green-500">Admin</span>
                    ) : item.role === "user" && item.isAdmin ? (
                      <span className="text-red-500">
                        User asked for Admin role
                      </span>
                    ) : (
                      <span className="text-gray-500">User</span>
                    )
                  ) : column.key === "actions" ? (
                    <div style={{ display: "flex", gap: "10px" }}>
                      <Button
                        auto
                        color="error"
                        onClick={() => grantAdminRights(item._id)}
                        className="text-red-400 font-extrabold text-[1.75rem] text-center"
                        isDisabled={
                          (item.isAdmin && item.role === "admin") ||
                          (!item.isAdmin && item.role === "user")
                        }
                      >
                        {FcStart()}
                      </Button>
                    </div>
                  ) : (
                    item[column.key]
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
