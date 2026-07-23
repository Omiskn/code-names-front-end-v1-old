import styles from "./BoardScreen.module.css";
import BoardHeader from "../components/BoardHeader";
import GameStatus from "../components/GameStatus";
import SpymasterInput from "../components/SpymasterInput";
import BoardGrid from "../components/BoardGrid";
import GameLog from "../components/GameLog";
import BoardFooter from "../components/BoardFooter";
import { useEffect } from "react";
import { SOCKET_EVENTS } from "../../../config";
import { useSocket } from "../../../contexts/socketContext";
import { useRoom } from "../../../contexts/roomContext";

const BoardScreen = () => {
  const socket = useSocket();
  const roomId = localStorage.getItem("roomId");
  const playerId = localStorage.getItem("playerId");
  const { setRoom, room, me } = useRoom();

  useEffect(() => {
    if (!socket) return;

    const handleGameUpdate = (safeRoom) => {
      setRoom(safeRoom);
    };
    socket.on(SOCKET_EVENTS.GAME_UPDATE, handleGameUpdate);

    return () => {
      socket.off(SOCKET_EVENTS.GAME_UPDATE, handleGameUpdate);
    };
  }, [socket, setRoom, room]);

  useEffect(() => {
    if (!socket) return;

    socket.emit(SOCKET_EVENTS.GET_ROOM_STATE, {
      roomId,
      playerId,
    });

    const handleRoomState = (room) => {
      setRoom(room);
    };

    socket.on(SOCKET_EVENTS.SEND_ROOM_STATE, handleRoomState);

    return () => {
      socket.off(SOCKET_EVENTS.SEND_ROOM_STATE, handleRoomState);
    };
  }, [socket, roomId, playerId]);

  // useEffect(() => {}, []);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <BoardHeader />

        <div className={styles.mainContent}>
          <div className={styles.leftColumn}>
            <GameStatus />

            {me?.role.toUpperCase() === "SPYMASTER" &&
            room.game?.currentTurn === me.team &&
            room.game?.phase !== "guessing" ? (
              <SpymasterInput />
            ) : null}
          </div>

          <div className={styles.centerColumn}>
            <BoardGrid />
          </div>

          <div className={styles.rightColumn}>
            {/* <PlayersPanel players={players} currentUser={currentUserId} /> */}
            <GameLog />
            {room.game?.phase === "spymaster" ? null : <BoardFooter />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoardScreen;
