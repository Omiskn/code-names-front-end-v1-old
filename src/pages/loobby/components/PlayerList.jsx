import { useRoom } from "../../../contexts/roomContext";
import styles from "./PlayerList.module.css";

const PlayerList = () => {
  const currentUser = localStorage.getItem("playerId");
  const { room } = useRoom();
  const players = room.players;
  return (
    <div className={styles.playersContainer}>
      {players.map((player) => (
        <div
          key={player.id}
          className={styles.playerCard}
          style={!player.socketId ? { backgroundColor: "#e1dfdf" } : {}}
        >
          <div className={styles.playerInfo}>
            <div className={styles.playerMain}>
              <span className={styles.playerName}>{player.name}</span>
              {player.id === currentUser && (
                <span className={styles.youBadge}>You</span>
              )}
            </div>
            <div className={styles.playerTags}>
              <span
                className={`${styles.teamTag} ${
                  player.team === "red" ? styles.redTeam : styles.blueTeam
                }`}
              >
                {player.team === null ? "not Selected" : player.team}
              </span>
              <span
                className={`${styles.roleTag} ${
                  player.role === "spymaster"
                    ? styles.spymaster
                    : styles.operative
                }`}
              >
                {player.role === null ? "not Selected" : player.role}
              </span>
            </div>
          </div>
          <div className={styles.playerActions}>
            {
              // player.id === currentUser ? (
              //   <div className={styles.userActions}>
              //     <button className={styles.readyBtn}>
              //       {player.isReady ? "Ready ✓" : "Click to Ready"}
              //     </button>
              //   </div>
              // ) :
              <div className={styles.statusIndicator}>
                {player.isReady ? (
                  <span className={styles.readyIndicator}>Ready ✓</span>
                ) : (
                  <span className={styles.waitingIndicator}>Waiting...</span>
                )}
              </div>
            }
          </div>
        </div>
      ))}
    </div>
  );
};

export default PlayerList;
