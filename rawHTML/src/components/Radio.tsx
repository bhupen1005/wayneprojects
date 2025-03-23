import styles from "./Radio.module.css";
const Radio = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        gap: "1rem",
        alignItems: "center",
      }}
    >
      <label className={styles.formControl}>
        <input type="radio" name="radio" />
        Radio
      </label>

      <label className={styles.formControl}>
        <input type="radio" name="radio" />
        Radio - checked
      </label>
    </div>
  );
};

export default Radio;
