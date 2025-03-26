import React, { createContext, useContext } from "react";
import { useMachine } from "@xstate/react";
import { delayRepayMachine } from "../delayRepayMachine";

const DelayRepayContext = createContext<any>(null);

export const DelayRepayProvider: React.FC = ({ children }) => {
  const [state, send] = useMachine(delayRepayMachine);

  return (
    <DelayRepayContext.Provider value={{ state, send }}>
      {children}
    </DelayRepayContext.Provider>
  );
};

export const useDelayRepay = () => {
  const context = useContext(DelayRepayContext);
  if (!context) {
    throw new Error("useDelayRepay must be used within a DelayRepayProvider");
  }
  return context;
};