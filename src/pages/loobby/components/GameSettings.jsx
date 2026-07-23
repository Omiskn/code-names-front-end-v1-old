import styles from "./GameSettings.module.css";

const GameSettings = () => {
  return (
    <div className={styles.gameSettings}>
      <h4 className={styles.settingsTitle}>Game Settings</h4>
      <div className={styles.settingsGrid}>
        <button className={styles.settingBtn}>
          <span className={styles.settingIcon}>⚙️</span>
          Settings
        </button>
        <button className={styles.settingBtn}>
          <span className={styles.settingIcon}>📋</span>
          Invite
        </button>
        <button className={styles.settingBtn}>
          <span className={styles.settingIcon}>👥</span>
          Auto-fill
        </button>
        <button className={styles.settingBtn}>
          <span className={styles.settingIcon}>🔄</span>
          Reset
        </button>
      </div>
    </div>
  );
};

export default GameSettings;