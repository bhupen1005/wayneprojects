import styles from "./Checkbox.module.css";
const CheckBox = () => {
  return (
    <div>
      <label className={styles.formControl}>
        <input type="checkbox" name="checkbox" />
        Checkbox
      </label>

      <label className={styles.formControl}>
        <input type="checkbox" name="checkbox-checked" disabled />
        Checkbox - checked
      </label>
    </div>
  );
};

export default CheckBox;
