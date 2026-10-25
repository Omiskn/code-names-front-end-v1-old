import { SOCKET_EVENTS } from "../../../config";
import { useRoom } from "../../../contexts/roomContext";
import { useSocket } from "../../../contexts/socketContext";
import styles from "./BoardFooter.module.css";

const BoardFooter = () => {
  const socket = useSocket();
  const { room, me } = useRoom();
  const roomId = room?.id || room?.roomId || localStorage.getItem("roomId");
  const playerId = me?.id || localStorage.getItem("playerId");

  const isOperative = me?.role?.toLowerCase() === "operative";
  const isMyTurn =
    room?.game?.currentTurn?.toLowerCase() === me?.team?.toLowerCase();
  const isGuessing = room?.game?.phase === "guessing";
  const canEndTurn = isOperative && isMyTurn && isGuessing;

  const handleEndTurn = () => {
    if (!socket || !canEndTurn) return;
    socket.emit(SOCKET_EVENTS.END_TURN, { roomId, playerId });
  };

  if (!canEndTurn) return null;

  return (
    <button className={styles.startGameBtn} onClick={handleEndTurn}>
      <span className={styles.startIcon}>🚀</span>
      End Turn
    </button>
  );
};

// {
//   room.game.phase === "spymaster";
// }

export default BoardFooter;
