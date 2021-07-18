import React, { useState } from "react";

let UserContext = React.createContext();

export default UserContext;

export const UserProvider = ({ children }) => {
  const [username, setUserName] = useState("");
  const [useremail, setUserEmail] = useState("");
  return (
    <UserContext.Provider
      value={{ username, setUserName, useremail, setUserEmail }}
    >
      {children}
    </UserContext.Provider>
  );
};
