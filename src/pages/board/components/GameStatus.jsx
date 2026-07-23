import { useRoom } from "../../../contexts/roomContext";
import styles from "./GameStatus.module.css";

const GameStatus = () => {
  const { room } = useRoom();
  return (
    <div className={styles.gameStatus}>
      <div className={styles.sectionCard}>
        <h3 className={styles.sectionTitle}>Current Clue</h3>
        <div className={styles.clueDisplay}>
          <span className={styles.clueWord}>
            {room.game?.clue === null ? "word" : room.game?.clue}
          </span>
          <span className={styles.clueCount}>
            for {room.game?.guessesLeft - 1}
          </span>
        </div>
      </div>

      {/* <div className={styles.sectionCard}>
        <h3 className={styles.sectionTitle}>Current Turn</h3>
        <div className={styles.turnInfo}>
          <span className={styles.turnTeam}>{currentTurn}</span>
          <span className={styles.turnRole}>{currentRole}</span>
        </div>
      </div> */}

      <div className={styles.sectionCard}>
        <h3 className={styles.sectionTitle}>Score</h3>
        <div className={styles.teamStats}>
          <div className={`${styles.teamScore} ${styles.redScore}`}>
            <span className={styles.scoreTeamName}>Red Team</span>
            <span className={styles.scoreValue}>
              {room.game?.remaining.red}
            </span>
          </div>
          <div className={`${styles.teamScore} ${styles.blueScore}`}>
            <span className={styles.scoreTeamName}>Blue Team</span>
            <span className={styles.scoreValue}>
              {room.game?.remaining.blue}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameStatus;
