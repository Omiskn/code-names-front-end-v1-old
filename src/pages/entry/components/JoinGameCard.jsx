import EntryCard from "./EntryCard";
import styles from "./JoinGameCard.module.css";
import { SOCKET_EVENTS } from "../../../config";
import { useRoom } from "../../../contexts/roomContext";
import { useSocket } from "../../../contexts/socketContext";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

const JoinGameCard = () => {
  const navigate = useNavigate();
  const socket = useSocket();
  const { updatePlayers } = useRoom();
  const [playerName, setPlayerName] = useState("");
  const [roomCode, setRoomCode] = useState("");

  const handleJoinRoom = () => {
    const playerId = localStorage.getItem("playerId");
    if (!playerName) return alert("Enter your name.");
    if (!roomCode) return alert("Enter room code.");

    socket.emit(SOCKET_EVENTS.JOIN_ROOM, {
      playerId,
      roomId: roomCode,
      playerName,
    });

    localStorage.setItem("roomId", roomCode);

    navigate(`/lobby/${roomCode}`);

    setPlayerName("");
    setRoomCode("");
  };

  // تسجيل listener مرة واحدة فقط
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
      title="Join Existing Game"
      description="Enter a room code to join an ongoing game"
    >
      <div className={styles.joinSection}>
        <input
          type="text"
          placeholder="Enter your name"
          className={styles.nameInput}
          maxLength={20}
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter Room Code"
          className={styles.codeInput}
          maxLength={6}
          value={roomCode}
          onChange={(e) => setRoomCode(e.target.value)}
        />
        <button className={styles.joinButton} onClick={handleJoinRoom}>
          Join Room
        </button>
      </div>
    </EntryCard>
  );
};

export default JoinGameCard;
