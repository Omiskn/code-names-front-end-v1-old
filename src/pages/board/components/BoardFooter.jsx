import { SOCKET_EVENTS } from "../../../config";
import { useRoom } from "../../../contexts/roomContext";
import { useSocket } from "../../../contexts/socketContext";
import styles from "./BoardFooter.module.css";

const BoardFooter = () => {
  const socket = useSocket();
  const { room, me } = useRoom();
  const roomId = room.id;
  const playerId = me?.id;

  const handleEndTurn = () => {
    socket.emit(SOCKET_EVENTS.END_TURN, { roomId, playerId });
  };
  return (
    // <div className={styles.footer}>

    <button className={styles.startGameBtn} onClick={handleEndTurn}>
      <span className={styles.startIcon}>🚀</span>
      End Turn
    </button>

    // </div>
  );
};

// {
//   room.game.phase === "spymaster";
// }

export default BoardFooter;
