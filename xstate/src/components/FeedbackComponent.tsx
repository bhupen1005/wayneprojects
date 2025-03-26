import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store"; // Adjust the path to your store
import { useFeedbackActions } from "../hooks/useFeedbackActions";

const FeedbackComponent: React.FC = () => {
  const feedbackState = useSelector((state: RootState) => state.feedback);
  const {
    feedbackGood,
    feedbackBad,
    feedbackUpdate,
    submit,
    close,
    restart,
  } = useFeedbackActions();

  return (
    <div>
      <h1>Feedback</h1>
      <p>Current State: {feedbackState.state}</p>
      <p>Feedback: {feedbackState.feedback}</p>

      <button onClick={feedbackGood}>Good Feedback</button>
      <button onClick={feedbackBad}>Bad Feedback</button>
      <input
        type="text"
        value={feedbackState.feedback}
        onChange={(e) => feedbackUpdate(e.target.value)}
        placeholder="Enter feedback"
      />
      <button onClick={submit}>Submit</button>
      <button onClick={close}>Close</button>
      <button onClick={restart}>Restart</button>
    </div>
  );
};

export default FeedbackComponent;
