// TeamSelection.jsx (updated)
// import { useState } from "react";
import styles from "./TeamSelection.module.css";
import { useSocket } from "../../../contexts/socketContext";
import { SOCKET_EVENTS } from "../../../config";
import { useRoom } from "../../../contexts/roomContext";

const TeamSelection = () => {
  const playerId = localStorage.getItem("playerId");
  const roomId = localStorage.getItem("roomId");
  const socket = useSocket();
  const { me, room } = useRoom();
  const playersCount = room.players.length;
  const redTeamCount = room.players.filter(
    (player) => player.team === "red"
  ).length;
  const blueTeamCount = room.players.filter(
    (player) => player.team === "blue"
  ).length;

  const handleTeamSelect = (team) => {
    if (!me || !room) return;
    me.team = me.team === team ? null : team;
    if (me.isReady) {
      socket.emit(SOCKET_EVENTS.TOGGLE_READY, {
        playerId: me.id,
        roomId: room.id,
      });
    }
    socket.emit(SOCKET_EVENTS.SELECT_TEAM, { roomId, playerId, team: me.team });
  };
  return (
    <div className={styles.controlGroup}>
      <h4 className={styles.controlTitle}>Choose Your Team</h4>
      <div className={styles.teamSelection}>
        <button
          className={`${styles.teamBtn} ${styles.redTeamBtn} ${
            me?.team === "red" ? styles.selected : ""
          }`}
          onClick={() => handleTeamSelect("red")}
        >
          <div className={styles.teamBtnContent}>
            {/* <div className={styles.teamIcon}>🔴</div> */}
            <div className={styles.teamInfo}>
              <div className={styles.teamName}>Red Team</div>
              <div className={styles.teamCount}>
                {redTeamCount}/{playersCount} players
              </div>
            </div>
            <div className={styles.checkmark}>{me?.team === "red" && "✓"}</div>
          </div>
        </button>
        <button
          className={`${styles.teamBtn} ${styles.blueTeamBtn} ${
            me?.team === "blue" ? styles.selected : ""
          }`}
          onClick={() => handleTeamSelect("blue")}
        >
          <div className={styles.teamBtnContent}>
            {/* <div className={styles.teamIcon}>🔵</div> */}
            <div className={styles.teamInfo}>
              <div className={styles.teamName}>Blue Team</div>
              <div className={styles.teamCount}>
                {blueTeamCount}/{playersCount} players
              </div>
            </div>
            <div className={styles.checkmark}>{me?.team === "blue" && "✓"}</div>
          </div>
        </button>
      </div>
    </div>
  );
};

export default TeamSelection;
