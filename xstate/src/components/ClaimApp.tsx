import { useMachine } from "@xstate/react";
import { useState } from "react";
import { Card, Text, Title, Button, Stack, Group } from "@mantine/core";
import { ClaimMachine } from "./ClaimMachine";

const journeys = [
  {
    id: 1,
    origin: "Station A",
    destination: "Station B",
    date: "2024-03-01",
    details: "Train delayed by 15 mins",
  },
  {
    id: 2,
    origin: "Station C",
    destination: "Station D",
    date: "2024-03-05",
    details: "Smooth journey",
  },
  {
    id: 3,
    origin: "Station E",
    destination: "Station F",
    date: "2024-03-10",
    details: "Seat change requested",
  },
];

const ClaimApp = () => {
  const [state, send] = useMachine(ClaimMachine);
  console.log("zz", state.context.expandedJourneyId);
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <Stack gap="md" p="md">
      <Title order={2}>Add Claim Flow</Title>

      {/* Customer Section */}
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Stack>
          <Title order={4}>Customer Section</Title>
          <Text>
            Current:{" "}
            {state.matches({ delayrepay: { customer: "customerForm" } }) ? (
              <form>
                <label>
                  Name:
                  <input type="text" name="name" />
                </label>
                <br />
                <label>
                  Email:
                  <input type="text" name="email" />
                </label>
                <br />
                <input
                  type="submit"
                  value="Submit"
                  onClick={() => {
                    send({ type: "moveToCustomerInfo" });
                  }}
                />
              </form>
            ) : (
              "Customer Info"
            )}
          </Text>
          {state.matches({ delayrepay: { customer: "customerForm" } }) ? (
            <Button onClick={() => send({ type: "moveToCustomerInfo" })}>
              Go to Customer Info
            </Button>
          ) : (
            <Button onClick={() => send({ type: "moveToCustomerForm" })}>
              Go to Customer Form
            </Button>
          )}
        </Stack>
      </Card>

      {/* Journey Section */}
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Stack>
          <Title order={4}>Journey Section</Title>
          {/* NOTE: Conditional Matches using state */}
          <Text>
            Current:{" "}
            {state.matches({ delayrepay: { journey: "journeyForm" } })
              ? "Journey Form"
              : state.matches({ delayrepay: { journey: "journeyList" } })
              ? "Journey List"
              : "Journey Table"}
          </Text>

          {/* NOTE: Event dispatch */}
          {state.matches({ delayrepay: { journey: "journeyForm" } }) && (
            <Button onClick={() => send({ type: "moveToJourneyList" })}>
              Go to Journey List
            </Button>
          )}

          {state.matches({ delayrepay: { journey: "journeyList" } }) && (
            <Stack>
              {journeys.map((journey) => (
                <Card key={journey.id} shadow="xs" padding="md" withBorder>
                  <Group justify="space-between">
                    <Text>
                      {journey.origin} ➔ {journey.destination} ({journey.date})
                    </Text>
                    <Button
                      size="xs"
                      variant="light"
                      onClick={() =>
                        send({ type: "toggleJourney", journeyId: journey.id })
                      }
                    >
                      {state.context.expandedJourneyId === journey.id
                        ? "Collapse"
                        : "Expand"}
                    </Button>
                  </Group>
                  {state.context.expandedJourneyId === journey.id && (
                    <Text mt="sm" c="dimmed">
                      {journey.details}
                    </Text>
                  )}
                </Card>
              ))}

              <Group>
                <Button onClick={() => send({ type: "moveToJourneyTable" })}>
                  Go to Journey Table
                </Button>
                <Button onClick={() => send({ type: "moveToJourneyForm" })}>
                  Back to Journey Form
                </Button>
              </Group>
            </Stack>
          )}

          {state.matches({ delayrepay: { journey: "journeyTable" } }) && (
            <Button onClick={() => send({ type: "moveToJourneyList" })}>
              Back to Journey List
            </Button>
          )}
        </Stack>
      </Card>

      {/* Ticket Section */}
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Stack>
          <Title order={4}>Ticket Section</Title>
          <Text>Always stays in Ticket Form (no transitions yet)</Text>
        </Stack>
      </Card>
    </Stack>
  );
};

export default ClaimApp;
