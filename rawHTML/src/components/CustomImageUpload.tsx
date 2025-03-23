import { useState } from "react";
import styles from "./CustomFileUpload.module.css";
import Divider from "./Divider";
import VerticalSpacing from "./VerticalSpacing";

const CustomImageUpload = () => {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div>
      <Divider />
      <input
        type="file"
        id="image-upload-btn"
        hidden
        accept="image/*"
        onChange={handleImageChange}
      />
      <label className={styles.label} htmlFor="image-upload-btn">
        Upload Image
      </label>
      <VerticalSpacing height={20} />

      {!image && <span id={styles["file-chosen"]}>No image chosen</span>}
      {image && (
        <div>
          <p>Image name: {image.name}</p>
          <p>Image size: {image.size} bytes</p>
          <p>Image type: {image.type}</p>
          {preview && (
            <img src={preview} alt="Preview" className={styles.preview} />
          )}
        </div>
      )}
    </div>
  );
};

export default CustomImageUpload;
