// EntryCard.jsx
import styles from "./EntryCard.module.css";

const EntryCard = ({ title, description, children }) => {
  return (
    <div className={styles.card}>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.description}>{description}</p>
      {children}
    </div>
  );
};

export default EntryCard;
