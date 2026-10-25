// import GameSettings from "./GameSettings";
import { useEffect } from "react";
import { SOCKET_EVENTS } from "../../../config";
import { useRoom } from "../../../contexts/roomContext";
import { useSocket } from "../../../contexts/socketContext";
import styles from "./LobbyFooter.module.css";
import { useNavigate } from "react-router";

const LobbyFooter = ({ waitingMessage }) => {
  const { room, setRoom, me } = useRoom();
  const socket = useSocket();
  const navigate = useNavigate();

  function starthandler() {
    if (!socket || !room) return;
    const roomId = room.id || room.roomId || localStorage.getItem("roomId");
    const playerId = me?.id || localStorage.getItem("playerId");

    socket.emit(SOCKET_EVENTS.START_GAME, { roomId, playerId });
  }

  useEffect(() => {
    if (!socket) return;

    const handleGameError = (errMsg) => {
      alert(errMsg);
    };

    socket.on("game_error", handleGameError);
    return () => {
      socket.off("game_error", handleGameError);
    };
  }, [socket]);

  useEffect(() => {
    if (!socket || !room) return;

    const handleIsStarted = (isTheGameStart) => {
      if (isTheGameStart) {
        navigate(`/board`);
      }
    };
    socket.on("isGameStarted", handleIsStarted);

    return () => {
      socket.off("isGameStarted", handleIsStarted);
    };
  }, [socket, room, navigate]);

  useEffect(() => {
    if (!socket) return;

    const handleGameUpdate = (safeRoom) => {
      setRoom(safeRoom);
    };
    socket.on(SOCKET_EVENTS.GAME_UPDATE, handleGameUpdate);

    return () => {
      socket.off(SOCKET_EVENTS.GAME_UPDATE, handleGameUpdate);
    };
  }, [socket, setRoom]);

  return (
    <div className={styles.footer}>
      <div className={styles.hostControls}>
        {me?.id === room.hoster?.id ? (
          <button className={styles.startGameBtn} onClick={starthandler}>
            <span className={styles.startIcon}>🚀</span>
            Start Game
          </button>
        ) : null}

        {/* <div className={styles.gameInfo}>
          <span className={styles.infoIcon}>💡</span>
          <span className={styles.infoText}>{waitingMessage}</span>
        </div> */}
      </div>
    </div>
  );
};

export default LobbyFooter;
