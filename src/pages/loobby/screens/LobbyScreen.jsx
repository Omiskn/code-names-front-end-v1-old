import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { useSocket } from "../../../contexts/socketContext";
import { useRoom } from "../../../contexts/roomContext";
import { SOCKET_EVENTS } from "../../../config";
import styles from "./LobbyScreen.module.css";
import LobbyHeader from "../components/LobbyHeader";
import PlayersPanel from "../components/PlayersPanel";
import UserControls from "../components/UserControls";
import LobbyFooter from "../components/LobbyFooter";

const LobbyScreen = () => {
  const navigate = useNavigate();
  const { roomId: paramRoomId } = useParams();
  const { updatePlayers, setRoom } = useRoom();
  const socket = useSocket();
  const storedRoomId = localStorage.getItem("roomId");
  const roomId = paramRoomId || storedRoomId;
  const playerId = localStorage.getItem("playerId");

  useEffect(() => {
    if (!socket) return;

    const handleRoomError = (err) => {
      alert(err || "This room does not exist!");
      navigate("/");
    };

    socket.on("room_error", handleRoomError);
    return () => {
      socket.off("room_error", handleRoomError);
    };
  }, [socket, navigate]);

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
  }, [socket, roomId, playerId, setRoom]);

  useEffect(() => {
    if (!socket) return;

    const handleRoomUpdate = (players) => {
      updatePlayers(players);
    };

    socket.on(SOCKET_EVENTS.ROOM_UPDATE, handleRoomUpdate);

    return () => {
      socket.off(SOCKET_EVENTS.ROOM_UPDATE, handleRoomUpdate);
    };
  }, [socket, updatePlayers]);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <LobbyHeader />

        <div className={styles.mainContent}>
          <PlayersPanel />
          <UserControls />
        </div>

        <LobbyFooter waitingMessage="Waiting for 3 more players to be ready..." />
      </div>
    </div>
  );
};

export default LobbyScreen;
