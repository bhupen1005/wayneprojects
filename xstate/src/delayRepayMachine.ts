import { createMachine } from "xstate";

export const delayRepayMachine = createMachine({
    context: {
        feedback: "",
        activeTab: "customer",
    },
    id: "addclaim",
    initial: "delayrepay",
    states: {
        delayrepay: {
            type: "parallel",
            states: {
                customer: {
                    initial: "CustomerSearchForm",
                    states: {
                        CustomerSearchForm: {
                            on: {
                                customerSubmit: {
                                    target: "CustomerInfo",
                                },
                            },
                        },
                        CustomerInfo: {},
                    },
                },
                journey: {
                    initial: "JourneySearchForm",
                    states: {
                        JourneySearchForm: {
                            on: {
                                submit: {
                                    target: "JourneyList",
                                },
                            },
                        },
                        JourneyList: {
                            type: "parallel",
                            on: {
                                select: {
                                    target: "JourneyTableUI",
                                },
                            },
                            states: {
                                expandButton: {
                                    on: {
                                        expand: {
                                            actions:[
                                                ({event:any}) => {
                                                    console.log(event);
                                                }
                                            ]
                                        },
                                    },
                                },
                                expandedUI: {
                                    on: {
                                        expand: {
                                            target: "expandButton",
                                        },
                                    },
                                },
                            },
                        },
                        JourneyTableUI: {},
                    },
                },
            },
        },
    },
});