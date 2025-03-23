import { useState } from "react";
import styles from "./CustomFileUpload.module.css";
import Divider from "./Divider";
import VerticalSpacing from "./VerticalSpacing";

const CustomMultipleImageUploadWithAddAndRemove = () => {
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setImages((prevImages) => [...prevImages, ...files]);
      setPreviews((prevPreviews) => [
        ...prevPreviews,
        ...files.map((file) => URL.createObjectURL(file)),
      ]);
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    setPreviews((prevPreviews) => prevPreviews.filter((_, i) => i !== index));
  };

  return (
    <div>
      <Divider />
      <input
        type="file"
        id="add-remove-images-btn"
        hidden
        accept="image/*"
        multiple
        onChange={handleImageChange}
      />
      <label className={styles.label} htmlFor="add-remove-images-btn">
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
              <button
                className={styles.removeButton}
                onClick={() => handleRemoveImage(index)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomMultipleImageUploadWithAddAndRemove;
