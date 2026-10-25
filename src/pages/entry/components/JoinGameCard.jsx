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
    const cleanName = playerName.trim();
    const cleanRoomCode = roomCode.trim();

    if (!cleanName) return alert("Enter your name.");
    if (!cleanRoomCode) return alert("Enter room code.");
    if (!socket) return alert("Connecting to server, please wait...");

    socket.emit(
      SOCKET_EVENTS.JOIN_ROOM,
      {
        playerId,
        roomId: cleanRoomCode,
        playerName: cleanName,
      },
      (res) => {
        if (res?.error) {
          alert(res.error);
          return;
        }
        localStorage.setItem("roomId", cleanRoomCode);
        navigate(`/lobby/${cleanRoomCode}`);
        setPlayerName("");
        setRoomCode("");
      }
    );
  };

  useEffect(() => {
    if (!socket) return;

    const handleRoomUpdate = (players) => {
      updatePlayers(players);
    };

    const handleRoomError = (err) => {
      alert(err);
    };

    socket.on(SOCKET_EVENTS.ROOM_UPDATE, handleRoomUpdate);
    socket.on("room_error", handleRoomError);

    return () => {
      socket.off(SOCKET_EVENTS.ROOM_UPDATE, handleRoomUpdate);
      socket.off("room_error", handleRoomError);
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
