import { createContext, useState } from "react";

const TriggerContext = createContext(undefined)

const TriggerContextProvider = (props) => {
  const triggerContext = useState(TriggerContext)
  return <TriggerContext.Provider value={triggerContext}>{props.children}</TriggerContext.Provider>
}

export default TriggerContext
export {TriggerContextProvider}