import { createContext, useState } from "react";

const LightModeContext = createContext(undefined);

function LightModeProvider(props) {
  const lightModeContext = useState(LightModeContext);
  return (
    <LightModeContext.Provider value={lightModeContext}>
      {props.children}
    </LightModeContext.Provider>
  );
}

export default LightModeContext;
export { LightModeProvider };
