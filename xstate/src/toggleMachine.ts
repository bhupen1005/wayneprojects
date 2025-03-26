import { assign, createActor, createMachine } from "xstate";

const toggleMachine = createMachine({
  id: "toggle",
  initial: "Inactive",
  states: {
    Inactive: {
      on: {
        toggle: "Reactive",
      },
    },
    Active: {
      on: { toggle: "Inactive" },
    },
    Reactive: {
      on: { toggle: "Active" },
    },
  },
});
// / Create an actor that you can send events to.
// Note: the actor is not started yet!
const actor = createActor(toggleMachine, {
  input: { count: 0, maxCount: 10 },
});

// Subscribe to snapshots (emitted state changes) from the actor
actor.subscribe((snapshot) => {
  console.log("Value:", snapshot.value);
});

// Start the actor
actor.start(); // logs 'Inactive'

// Send events
actor.send({ type: "toggle" }); // logs 'Active'
actor.send({ type: "toggle" }); // logs 'Inactive'

export { toggleMachine };
