import { createContext, useState } from "react";

const UserContext = createContext(undefined)

const UserContextProvider = (props) => {
  const userContext = useState(UserContext)
  return <UserContext.Provider value={userContext}>{props.children}</UserContext.Provider>
}

export default UserContext
export {UserContextProvider}