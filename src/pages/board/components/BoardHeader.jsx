import { useRoom } from "../../../contexts/roomContext";
import styles from "./BoardHeader.module.css";

// background: rgb(146 215 255 / 10%);
// border: 1px solid rgb(146 215 255);
// color: #24a4cd;

function RoomInfo({ title, content, turn = "red" }) {
  return (
    <div
      className={`${styles.roomInfo} ${
        turn === "red" ? styles.redTurn : styles.blueTurn
      }`}
    >
      <span className={styles.roomLabel}>{title}:</span>
      <span
        className={styles.roomCode}
        style={turn === "red" ? { color: "#ff6b35" } : { color: "#24a4cd" }}
      >
        {content}
      </span>
    </div>
  );
}

const BoardHeader = () => {
  const { room } = useRoom();

  return (
    <div className={styles.headerSection}>
      <div className={styles.headerLeft}>
        <h1 className={styles.title}>Code Names</h1>
        <RoomInfo
          title="Room"
          content={room.id}
          turn={room.game?.currentTurn}
        />
        <RoomInfo
          title="Turn"
          content={room.game?.currentTurn}
          turn={room.game?.currentTurn}
        />
        <RoomInfo
          title="Phase"
          content={room.game?.phase}
          turn={room.game?.currentTurn}
        />
      </div>
      <div className={styles.headerRight}>
        <div className={styles.stats}>
          {/* <div className={styles.stat}>
            <span className={styles.statValue}>{timer}</span>
            <span className={styles.statLabel}>Time</span>
          </div> */}
          <div className={styles.stat}>
            <span className={styles.statValue}>{room.players.length}</span>
            <span className={styles.statLabel}>Players</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoardHeader;
