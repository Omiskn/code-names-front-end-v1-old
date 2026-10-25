import { useRoom } from "../../../contexts/roomContext";
import styles from "./PlayerList.module.css";

const PlayerList = () => {
  const currentUser = localStorage.getItem("playerId");
  const { room } = useRoom();
  const players = room?.players || [];
  return (
    <div className={styles.playersContainer}>
      {players.map((player) => {
        const teamLower = player.team?.toLowerCase();
        const roleLower = player.role?.toLowerCase();
        return (
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
                    teamLower === "red" ? styles.redTeam : styles.blueTeam
                  }`}
                >
                  {teamLower || "not Selected"}
                </span>
                <span
                  className={`${styles.roleTag} ${
                    roleLower === "spymaster"
                      ? styles.spymaster
                      : styles.operative
                  }`}
                >
                  {roleLower || "not Selected"}
                </span>
              </div>
            </div>
            <div className={styles.playerActions}>
              <div className={styles.statusIndicator}>
                {player.isReady ? (
                  <span className={styles.readyIndicator}>Ready ✓</span>
                ) : (
                  <span className={styles.waitingIndicator}>Waiting...</span>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PlayerList;
