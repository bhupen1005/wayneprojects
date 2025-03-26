import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FeedbackState {
    state: 'prompt' | 'form' | 'thanks' | 'closed';
    feedback: string;
}

const initialState: FeedbackState = {
    state: 'prompt',
    feedback: ''
};

const feedbackSlice = createSlice({
    name: 'feedback',
    initialState,
    reducers: {
        feedbackGood(state) {
            state.state = 'thanks';
        },
        feedbackBad(state) {
            state.state = 'form';
        },
        feedbackUpdate(state, action: PayloadAction<string>) {
            state.feedback = action.payload;
        },
        back(state) {
            state.state = 'prompt';
        },
        submit(state) {
            if (state.feedback.length > 0) {
                state.state = 'thanks';
            }
        },
        close(state) {
            state.state = 'closed';
        },
        restart(state) {
            state.state = 'prompt';
            state.feedback = '';
        }
    }
});

export const {
    feedbackGood,
    feedbackBad,
    feedbackUpdate,
    back,
    submit,
    close,
    restart
} = feedbackSlice.actions;

export default feedbackSlice.reducer;
