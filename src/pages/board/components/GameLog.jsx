import { useRoom } from "../../../contexts/roomContext";
import styles from "./GameLog.module.css";

const GameLog = () => {
  const { room } = useRoom();
  const logs = room.game?.logs;
  return (
    <div className={styles.sectionCard}>
      <h3 className={styles.sectionTitle}>Game Log</h3>
      <div className={styles.logContainer}>
        {logs?.map((log, index) => (
          <div
            key={index}
            className={`${styles.logEntry} ${
              log?.cardType === null ? styles[log?.team] : styles[log?.cardType]
            }`}
          >
            <span className={styles.logText}>{log?.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameLog;
