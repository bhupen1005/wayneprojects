import { useState } from "react";
import styles from "./CustomFileUpload.module.css";
import Divider from "./Divider";
import VerticalSpacing from "./VerticalSpacing";

const CustomMultipleFileUpload = () => {
  const [files, setFiles] = useState<File[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  return (
    <div>
      <Divider />
      <input
        type="file"
        id="multiple-files-btn"
        hidden
        multiple
        onChange={handleFileChange}
      />
      <label className={styles.label} htmlFor="multiple-files-btn">
        Upload Files
      </label>
      <VerticalSpacing height={20} />

      {files.length === 0 && (
        <span id={styles["file-chosen"]}>No files chosen</span>
      )}
      {files.length > 0 && (
        <ul>
          {files.map((file, index) => (
            <li key={index}>
              <p>File name: {file.name}</p>
              <p>File size: {file.size} bytes</p>
              <p>File type: {file.type}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomMultipleFileUpload;
