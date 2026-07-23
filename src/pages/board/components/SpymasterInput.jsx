import { useState } from "react";
import styles from "./SpymasterInput.module.css";
import { useSocket } from "../../../contexts/socketContext";
import { useRoom } from "../../../contexts/roomContext";
import { SOCKET_EVENTS } from "../../../config";

const SpymasterInput = () => {
  const [number, setNumber] = useState("");
  const [clue, setClue] = useState("");
  const { room, me } = useRoom();
  const socket = useSocket();

  function handleSendClue() {
    if (!room || !socket) return;

    const roomId = room.id;
    const playerId = me.id;

    socket.emit(SOCKET_EVENTS.SEND_CLUE, { roomId, playerId, clue, number });
    setClue("");
    setNumber("");
  }

  return (
    <div
      className={`${styles.spymasterCard} ${styles.spymasterCardFadeAnimation}`}
    >
      <h3 className={styles.sectionTitle}>Give Your Clue</h3>
      <div className={styles.spymasterForm}>
        <div className={styles.clueInputGroup}>
          <input
            type="text"
            placeholder="Enter clue word"
            className={styles.clueInput}
            maxLength={20}
            value={clue}
            onChange={(e) => setClue(e.target.value)}
          />
          <input
            type="number"
            placeholder="#"
            className={styles.countInput}
            min={0}
            max={9}
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          />
        </div>
        <button className={styles.submitClueBtn} onClick={handleSendClue}>
          <span className={styles.submitIcon}>🎯</span>
          Give Clue
        </button>
      </div>
    </div>
  );
};

export default SpymasterInput;
