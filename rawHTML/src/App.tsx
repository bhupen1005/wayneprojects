import { useState } from "react";
import Radio from "./components/Radio";
import CheckBox from "./components/CheckBox";
import Divider from "./components/Divider";
import Scrollbars from "./components/Scrollbars";
import CustomFileUpload from "./components/CustomFileUpload";
import CustomMultipleFileUpload from "./components/CustomMultipleFileUpload";
import CustomImageUpload from "./components/CustomImageUpload";
import CustomMultipleImageUpload from "./components/CustomMultipleImageUpload";
import CustomMultipleImageUploadWithAddAndRemove from "./components/CustomMultipleImageUploadWithAddAndRemove";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Radio />
      <Divider />
      <CheckBox />
      {/* <Scrollbars /> */}
      <CustomFileUpload />
      <CustomMultipleFileUpload />
      <CustomImageUpload />
      <CustomMultipleImageUpload />
      <CustomMultipleImageUploadWithAddAndRemove />
    </>
  );
}

export default App;
