import styles from "./PlayerList.module.css";

const PlayerList = ({ players, currentUser }) => {
  return (
    <div className={styles.playersContainer}>
      {players.map((player) => (
        <div key={player.id} className={styles.playerCard}>
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
                {player.team} team
              </span>
              <span
                className={`${styles.roleTag} ${
                  player.role === "spymaster"
                    ? styles.spymaster
                    : styles.operative
                }`}
              >
                {player.role}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PlayerList;
