import { useState } from "react";
import styles from "./SpymasterInput.module.css";
import { useSocket } from "../../../contexts/socketContext";
import { useRoom } from "../../../contexts/roomContext";
import { SOCKET_EVENTS } from "../../../config";

import { useToast } from "../../../contexts/toastContext";

const SpymasterInput = () => {
  const [number, setNumber] = useState("");
  const [clue, setClue] = useState("");
  const { room, me } = useRoom();
  const { showToast } = useToast();
  const socket = useSocket();

  function handleSendClue() {
    if (!room || !socket) return;
    const cleanClue = clue.trim();
    if (!cleanClue) return showToast("Please enter a clue word.");
    if (number === "" || isNaN(Number(number)) || Number(number) < 0) {
      return showToast("Please enter a valid card count.");
    }

    const roomId = room.id || room.roomId || localStorage.getItem("roomId");
    const playerId = me?.id || localStorage.getItem("playerId");

    socket.emit(SOCKET_EVENTS.SEND_CLUE, {
      roomId,
      playerId,
      clue: cleanClue,
      number: Number(number),
    });
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
