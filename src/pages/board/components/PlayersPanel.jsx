import styles from "./PlayersPanel.module.css";
import PlayerList from "./PlayerList";

const PlayersPanel = ({ players, currentUser }) => {
  return (
    <div className={styles.sectionCard}>
      <h3 className={styles.sectionTitle}>Players</h3>
      <PlayerList players={players} currentUser={currentUser} />
    </div>
  );
};

export default PlayersPanel;
