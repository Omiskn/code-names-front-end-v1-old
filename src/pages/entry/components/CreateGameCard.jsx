import EntryCard from "./EntryCard";
import styles from "./CreateGameCard.module.css";
import { useEffect, useState } from "react";
import { useRoom } from "../../../contexts/roomContext";
import { useSocket } from "../../../contexts/socketContext";
import { v4 as uuidv4 } from "uuid";
import { SOCKET_EVENTS } from "../../../config";
import { useNavigate } from "react-router";

import { useToast } from "../../../contexts/toastContext";

const CreateGameCard = () => {
  const { joinRoom, updatePlayers } = useRoom();
  const { showToast } = useToast();
  const socket = useSocket();
  const [playerName, setPlayerName] = useState("");
  const navigate = useNavigate();
  const playerId = localStorage.getItem("playerId");

  const handleCreateRoom = () => {
    const cleanName = playerName.trim();
    if (!cleanName) return showToast("Please enter your name.");
    if (!socket) return showToast("Connecting to server, please wait...", "info");
    const roomId = uuidv4().slice(0, 6);

    // console.log(roomId);
    // if (!roomId) {
    //   const newRoomId = uuidv4().slice(0, 6);
    //   localStorage.setItem("roomId", newRoomId);
    // }

    joinRoom({
      roomId,
      hoster: { playerId, socketId: socket.id, name: playerName },
    });

    socket.emit(SOCKET_EVENTS.CREATE_ROOM, {
      playerId,
      roomId,
      playerName,
    });

    localStorage.setItem("roomId", roomId);
    navigate(`/lobby/${roomId}`);
    setPlayerName("");
  };

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
    <EntryCard
      title="Create New Game"
      description="Start a private room and invite friends to join"
    >
      <div className={styles.formSection}>
        <input
          type="text"
          placeholder="Enter your name"
          className={styles.nameInput}
          maxLength={20}
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
        />
        <button
          className={styles.createButton}
          onClick={handleCreateRoom}
          disabled={!socket} // <--- الزر معطل حتى يتصل socket
        >
          {socket ? "Create Room" : "Connecting..."}
        </button>
      </div>
    </EntryCard>
  );
};

export default CreateGameCard;
