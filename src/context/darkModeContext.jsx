import { createContext, useState } from "react";

const DarkModeContext = createContext(undefined);

function DarkModeProvider(props) {
  const darkModeContext = useState(DarkModeContext);
  return (
    <DarkModeContext.Provider value={darkModeContext}>
      {props.children}
    </DarkModeContext.Provider>
  );
}

export default DarkModeContext;
export { DarkModeProvider };
