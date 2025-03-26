import { createMachine } from 'xstate';

export const feedbackMachine = createMachine({
    id: 'feedback',
    initial: 'question',
    states: {
        question: {
            on: {
                'feedback.good': {
                    target: 'thanks',
                },
            },
        },
        thanks: {
            // ...
        },
        // ...
    },
});