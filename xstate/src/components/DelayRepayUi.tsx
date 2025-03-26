import { useMachine } from "@xstate/react";
import { createBrowserInspector } from "@statelyai/inspect";
import { Accordion, Box, Button, Text } from "@mantine/core";
import { delayRepayMachine } from "../delayRepayMachine";

const { inspect } = createBrowserInspector({
  // Comment out the line below to start the inspector
  autoStart: false,
});
function DelayRepay() {
  const [state, send] = useMachine(delayRepayMachine, {
    inspect,
  });

  // state.matches("selectCustomerForm") &&
  // send({
  //   type: "submit",
  // });
  console.log(state);
  return (
    <Accordion
      defaultValue={state.context.activeTab}
      onChange={(value) => {
        if (value === "customer") {
          send({
            type: "customerToggle",
          });
        }
        if (value === "journey") {
          send({
            type: "journeyToggle",
          });
        }
        if (value === "ticket") {
          send({
            type: "ticketToggle",
          });
        }
      }}
    >
      <Accordion.Item value="customer">
        <Accordion.Control>Customer Details</Accordion.Control>
        <Accordion.Panel>
          {state.matches("delayrepay.customer") && (
            <Box>
              <Text>Customer Form</Text>
              <Button
                onClick={() => {
                  send({
                    type: "customerSubmit",
                  });
                }}
              >
                Submit
              </Button>
            </Box>
          )}
          {state.matches("CustomerInfo") && (
            <Box>
              <Text>Customer Information</Text>
              <Button
                onClick={() => {
                  send({
                    type: "toCustomer",
                  });
                }}
              >
                Back
              </Button>
            </Box>
          )}
        </Accordion.Panel>
      </Accordion.Item>

      <Accordion.Item value="journey">
        <Accordion.Control>Journey Details</Accordion.Control>
        <Accordion.Panel>
          {state.matches("delayrepay.journey.JourneySearchForm") && (
            <Box>
              <Text>Journey Form</Text>
              <Button
                onClick={() => {
                  send({
                    type: "submit",
                  });
                }}
              >
                Submit
              </Button>
            </Box>
          )}
          {state.matches("delayrepay.journey.JourneyList") && (
            <Box>
              <Text>Journey Information</Text>
              <Button
                onClick={() => {
                  if (
                    state.matches("delayrepay.journey.JourneyList.expandedUI")
                  ) {
                    send({
                      type: "expand.hide",
                    });
                  }
                  send({
                    type: "expand.show",
                  });
                }}
              >
                Expand
              </Button>
              <Button
                onClick={() => {
                  send({
                    type: "toJourney",
                  });
                }}
              >
                Back
              </Button>
              {state.matches("delayrepay.journey.JourneyList.expandedUI") && (
                <Box>
                  <Text>Journey Expand Info</Text>
                </Box>
              )}
            </Box>
          )}
        </Accordion.Panel>
      </Accordion.Item>

      <Accordion.Item value="ticket">
        <Accordion.Control>Ticket Details</Accordion.Control>
        <Accordion.Panel>Ticket Details UI</Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
}

export default DelayRepay;
