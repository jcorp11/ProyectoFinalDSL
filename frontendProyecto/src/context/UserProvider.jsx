import React, { useEffect } from "react";
import { createContext } from "react";
import { useState } from "react";
import { useLocalStorage } from '../Hooks/useLocalStorage.js'
/* import useFetch from "../Hooks/useFetch.js"; */

export const userContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage("user", null);
  const [token, setToken] = useLocalStorage("token", false);
  const [usersAll, setUsersAll] = useState([]);

  // const { data, loading, error } = useFetch("/users.json");

  // useEffect(() => {
  //   if (data) {
  //     setUsersAll(data);
  //   }
  // }, [data]);
  return (
    <userContext.Provider
      value={{ user, setUser, token, setToken, usersAll, setUsersAll }}
    >
      {children}
    </userContext.Provider>
  );
};

export default UserProvider;
