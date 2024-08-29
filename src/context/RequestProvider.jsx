// import { createContext, useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import ENVConfig from "../Utils/env.config";

// export const RequestContext = createContext();

// const RequestProvider = ({ children }) => {
//   const [requests, setRequest] = useState([]);
//   const [offers, setOffers] = useState([]);

//     useEffect(() => {
//    const getRequests = () =>
//     axios
//       .get(ENVConfig.API_ServerURL, "/requests", {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       })
//       .then((res) => {
//         if (res.data) {
//           console.log(res.data);
//           setRequests(res.data);
//         }
//       })
//       .catch(console.log);

//   }, []);
// }

//  // updateprofile;

//   return (
//     <AuthContext.Provider
//       value={{getRequests}}
//     > {children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthProvider;
