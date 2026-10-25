import { useRoom } from "../../../contexts/roomContext";
import styles from "./GameStatus.module.css";

const GameStatus = () => {
  const { room } = useRoom();
  const hasClue = !!room?.game?.clue;
  const guessesLeft = room?.game?.guessesLeft ?? 0;
  const winner = room?.game?.winner;

  return (
    <div className={styles.gameStatus}>
      {winner && (
        <div
          className={styles.sectionCard}
          style={{
            borderColor: winner === "red" ? "#ff6b35" : "#24a4cd",
            background: winner === "red" ? "rgba(255,107,53,0.15)" : "rgba(36,164,205,0.15)",
            textAlign: "center",
          }}
        >
          <h3 className={styles.sectionTitle} style={{ color: "#fff" }}>
            🏆 Game Over!
          </h3>
          <p style={{ margin: "8px 0 0", fontWeight: "bold", textTransform: "capitalize", color: winner === "red" ? "#ff6b35" : "#24a4cd" }}>
            {winner} Team Wins!
          </p>
        </div>
      )}

      <div className={styles.sectionCard}>
        <h3 className={styles.sectionTitle}>Current Clue</h3>
        <div className={styles.clueDisplay}>
          <span className={styles.clueWord}>
            {hasClue ? room.game.clue : "Waiting for clue..."}
          </span>
          {hasClue && (
            <span className={styles.clueCount}>
              {guessesLeft} guesses left
            </span>
          )}
        </div>
      </div>

      <div className={styles.sectionCard}>
        <h3 className={styles.sectionTitle}>Cards Remaining</h3>
        <div className={styles.teamStats}>
          <div className={`${styles.teamScore} ${styles.redScore}`}>
            <span className={styles.scoreTeamName}>Red Team</span>
            <span className={styles.scoreValue}>
              {room?.game?.remaining?.red ?? 0}
            </span>
          </div>
          <div className={`${styles.teamScore} ${styles.blueScore}`}>
            <span className={styles.scoreTeamName}>Blue Team</span>
            <span className={styles.scoreValue}>
              {room?.game?.remaining?.blue ?? 0}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameStatus;
