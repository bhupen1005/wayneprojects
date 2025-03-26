import { assign, setup } from "xstate";

export const ClaimMachine = setup({
    types: {
        context: {} as {
            feedback: string;
            activeTab: string;
            activeCustomerSection: string;
            expandedJourneyId: number | null;
        },
        events: {} as
            | { type: "moveToCustomerInfo" }
            | { type: "moveToCustomerForm" }
            | { type: "moveToJourneyList" }
            | { type: "moveToJourneyTable" }
            | { type: "moveToJourneyForm" }
            | { type: "toggleJourney"; journeyId: number },
    },
    actions: {
        // NOTE: Toggle like functionality using event and context in xstate
        // changing the value in the context based on the event

        // TIP: If you want to open multiple expand UIs, you can use an array in the context
        toggleExpandedJourney: assign({
            expandedJourneyId: ({ event, context }: any) => {
                if (context.expandedJourneyId === event.journeyId) {
                    return null;
                } else {
                    return event.journeyId;
                }
            },
            //IMPORTANT: You can update more than one context value at a time
        }),
    },

}).createMachine({

    context: {
        feedback: "",
        activeTab: "customer",
        activeCustomerSection: "CustomerSearchForm,CustomerInfo",
        // TIP: null as number | null
        expandedJourneyId: null as number | null,
    },
    id: "addclaim",
    initial: "delayrepay",

    states: {
        delayrepay: {
            type: "parallel",
            states: {
                customer: {
                    initial: "customerForm",
                    states: {
                        customerForm: {
                            on: {
                                moveToCustomerInfo: {
                                    target: "customerInfo",
                                },
                            },
                        },
                        customerInfo: {
                            on: {
                                moveToCustomerForm: {
                                    target: "customerForm",
                                },
                            },
                        },
                    },
                },
                journey: {
                    initial: "journeyForm",
                    states: {
                        journeyForm: {
                            on: {
                                moveToJourneyList: {
                                    target: "journeyList",
                                },
                            },
                        },
                        journeyList: {
                            on: {
                                toggleJourney: {    // NOTE: Toggle like functionality using event and context
                                    target: "journeyList",
                                    actions: {
                                        type: "toggleExpandedJourney",
                                    },
                                    // TIP: When you want to do multiple actions, you can use an array
                                    // actions: [
                                    //     {
                                    //       type: "toggleExpandedJourney",
                                    //     },
                                    //     {
                                    //       type: "oneMoreAction",
                                    //     },
                                    //   ],
                                },
                                // INFO:  In simple events, you can use the target property directly, to move to a state
                                moveToJourneyTable: {
                                    target: "journeyTable",
                                },
                                moveToJourneyForm: {
                                    target: "journeyForm",
                                },
                            },
                        },
                        journeyTable: {
                            on: {
                                moveToJourneyList: {
                                    target: "journeyList",
                                },
                            },
                        },
                    },
                },
                ticket: {
                    initial: "ticketForm",
                    states: {
                        ticketForm: {},
                    },
                },
            },
        },
    },
});