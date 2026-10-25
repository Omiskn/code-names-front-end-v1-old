import { COLORS, SOCKET_EVENTS } from "../../../config";
import { useRoom } from "../../../contexts/roomContext";
import { useSocket } from "../../../contexts/socketContext";
import styles from "./Card.module.css";

function Card({
  color = COLORS.neutral,
  word = "",
  type = null,
  cardId = null,
  revealed = false,
}) {
  const socket = useSocket();
  const { room, me } = useRoom();
  const roomId = room?.id || room?.roomId || localStorage.getItem("roomId");
  const playerId = me?.id || localStorage.getItem("playerId");

  const isOperative = me?.role?.toLowerCase() === "operative";
  const isMyTurn =
    room?.game?.currentTurn?.toLowerCase() === me?.team?.toLowerCase();
  const isGuessingPhase = room?.game?.phase === "guessing";
  const canClick = isOperative && isMyTurn && isGuessingPhase && !revealed;

  function handleSelectWord() {
    if (!socket || !canClick) return;
    socket.emit(SOCKET_EVENTS.SELECT_WORD, { roomId, playerId, cardId });
  }

  return (
    <>
      {revealed ? (
        <img
          src={`/${type}.jpg`}
          alt={type || "card"}
          className={`${styles.img} ${styles.revealAnimation}`}
        />
      ) : (
        <div
          className={styles.cardOut}
          style={{
            backgroundColor: color.outColor,
            cursor: canClick ? "pointer" : "default",
          }}
          onClick={handleSelectWord}
        >
          <div
            className={styles.cardIn}
            style={{
              backgroundColor: color.innerColor,
              borderColor: color.borderAndLine,
            }}
          >
            <div
              className={styles.line}
              style={{ backgroundColor: color.borderAndLine }}
            ></div>
            <div
              className={styles.person}
              style={{ borderColor: color.picBorder }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                shapeRendering="geometricPrecision"
                textRendering="geometricPrecision"
                imageRendering="optimizeQuality"
                opacity={0.3}
                fillRule="evenodd"
                clipRule="evenodd"
                viewBox="0 0 512 511.142"
              >
                <path
                  fillRule="nonzero"
                  d="M147.532 262.835c-9.491-15.114-27.284-35.632-27.284-53.334 0-10.001 7.88-23.041 19.17-25.943-.898-14.966-1.485-30.172-1.485-45.209 0-8.905.168-17.894.504-26.715 3.507-39.979 32.149-68.182 68.492-81.43C221.504 24.89 214.44.343 230.431.02c37.366-.968 98.79 33.225 122.753 59.168 15.251 16.864 23.961 38.69 24.469 61.43l-1.52 65.434c6.645 1.621 14.069 6.807 15.712 13.451 5.109 20.652-16.32 46.356-26.28 62.779-9.196 15.164-44.304 64.211-44.337 64.551-.167 1.771.741 4.024 3.155 7.637C378.895 409.396 512 362.119 512 511.142H0c0-149.115 133.15-101.744 187.617-176.67 2.691-3.957 3.92-6.089 3.89-7.826-.016-.93-40.362-58.059-43.975-63.811z"
                />
              </svg>
            </div>
            <div className={styles.wordBackground}>
              <p className={styles.word}>{word}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
export default Card;
