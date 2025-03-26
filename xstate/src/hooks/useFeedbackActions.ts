import { useDispatch } from 'react-redux';
import { feedbackGood, feedbackBad, feedbackUpdate, back, submit, close, restart } from '../feedbackSlice';

export const useFeedbackActions = () => {
    const dispatch = useDispatch();

    return {
        feedbackGood: () => dispatch(feedbackGood()),
        feedbackBad: () => dispatch(feedbackBad()),
        feedbackUpdate: (feedback: string) => dispatch(feedbackUpdate(feedback)),
        back: () => dispatch(back()),
        submit: () => dispatch(submit()),
        close: () => dispatch(close()),
        restart: () => dispatch(restart()),
    };
};