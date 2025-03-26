import { feedbackMachine } from "./feedbackMachine";
import { useMachine } from "@xstate/react";
import { createBrowserInspector } from "@statelyai/inspect";
import { delayRepayMachine } from "./delayRepayMachine";
import { Accordion, Box, Button, Text } from "@mantine/core";
import "@mantine/core/styles.css";
import AccordionDemo from "./components/Accordion";
import DelayRepay from "./components/DelayRepayUi";
import ClaimApp from "./components/ClaimApp";

const { inspect } = createBrowserInspector({
  // Comment out the line below to start the inspector
  autoStart: false,
});

function App() {
  return <ClaimApp />;
}

export default App;
