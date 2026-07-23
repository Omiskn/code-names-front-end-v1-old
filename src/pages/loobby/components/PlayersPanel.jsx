import PlayerList from "./PlayerList";
import styles from "./PlayersPanel.module.css";

const PlayersPanel = () => {
  return (
    <div className={styles.leftColumn}>
      <div className={styles.sectionHeader}>
        <h3 className={styles.sectionTitle}>Players in Lobby</h3>
        <div className={styles.statusBadge}>
          <span className={styles.waitingIcon}>⏳</span>
          Waiting for players...
        </div>
      </div>
      <div className={styles.playersWrapper}>
        <PlayerList />
      </div>
    </div>
  );
};

export default PlayersPanel;
