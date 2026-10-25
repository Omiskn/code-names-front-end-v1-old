import { useParams } from "react-router";
import styles from "./LobbyHeader.module.css";
import { useRoom } from "../../../contexts/roomContext";

const LobbyHeader = () => {
  const { room } = useRoom();
  const playerCount = room?.players?.length || 0;
  const readyCount =
    room?.players?.filter((player) => player.isReady).length || 0;
  const { roomId: roomCode } = useParams();

  return (
    <div className={styles.headerSection}>
      <div className={styles.headerLeft}>
        <h1 className={styles.title}>Code Names</h1>
        <div className={styles.roomInfo}>
          <span className={styles.roomLabel}>Room:</span>
          <span className={styles.roomCode}>{roomCode}</span>
        </div>
      </div>
      <div className={styles.headerRight}>
        <div className={styles.stats}>
          <div className={styles.stat}>
            <span className={styles.statValue}>{playerCount}</span>
            <span className={styles.statLabel}>Players</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statValue}>
              {readyCount}/{playerCount}
            </span>
            <span className={styles.statLabel}>Ready</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LobbyHeader;
