import styles from "./QuickActions.module.css";

const QuickActions = () => {
  return (
    <div className={styles.quickActions}>
      <button className={styles.actionBtn}>
        <span className={styles.actionIcon}>🔀</span>
        Switch Team
      </button>
      <button className={styles.actionBtn}>
        <span className={styles.actionIcon}>🎲</span>
        Random
      </button>
    </div>
  );
};

export default QuickActions;