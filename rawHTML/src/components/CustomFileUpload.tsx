import { useState } from "react";
import styles from "./CustomFileUpload.module.css";
import Divider from "./Divider";
import VerticalSpacing from "./VerticalSpacing";

const CustomFileUpload = () => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <div>
      <Divider />
      <input type="file" id="actual-btn" hidden onChange={handleFileChange} />
      <label className={styles.label} htmlFor="actual-btn">
        Upload File
      </label>
      <VerticalSpacing height={20} />
      <input type="file" id="actual-btn" hidden />

      <label className={styles.label} htmlFor="actual-btn">
        Upload File
      </label>

      {!file && <span id={styles["file-chosen"]}>No file chosen</span>}
      {file && <span id={styles["file-chosen"]}>{file.name}</span>}
      <VerticalSpacing height={10} />
      {file && <p>Selected file: {file.name}</p>}
      {file && <p>Selected file: {file.size} bytes</p>}
      {file && <p>Selected file: {file.type}</p>}
    </div>
  );
};

export default CustomFileUpload;
