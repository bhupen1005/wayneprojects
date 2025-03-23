import { useState } from "react";
import styles from "./CustomFileUpload.module.css";
import Divider from "./Divider";
import VerticalSpacing from "./VerticalSpacing";

const CustomMultipleImageUpload = () => {
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setImages(files);
      setPreviews(files.map((file) => URL.createObjectURL(file)));
    }
  };

  return (
    <div>
      <Divider />
      <input
        type="file"
        id="multiple-images-btn"
        hidden
        accept="image/*"
        multiple
        onChange={handleImageChange}
      />
      <label className={styles.label} htmlFor="multiple-images-btn">
        Upload Images
      </label>
      <VerticalSpacing height={20} />

      {images.length === 0 && (
        <span id={styles["file-chosen"]}>No images chosen</span>
      )}
      {images.length > 0 && (
        <ul>
          {images.map((image, index) => (
            <li key={index}>
              <p>Image name: {image.name}</p>
              <p>Image size: {image.size} bytes</p>
              <p>Image type: {image.type}</p>
              {previews[index] && (
                <img
                  width={200}
                  src={previews[index]}
                  alt={`Preview ${index}`}
                  className={styles.preview}
                />
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomMultipleImageUpload;
