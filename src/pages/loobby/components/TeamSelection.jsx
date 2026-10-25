// TeamSelection.jsx (updated)
// import { useState } from "react";
import styles from "./TeamSelection.module.css";
import { useSocket } from "../../../contexts/socketContext";
import { SOCKET_EVENTS } from "../../../config";
import { useRoom } from "../../../contexts/roomContext";

const TeamSelection = () => {
  const roomId = localStorage.getItem("roomId");
  const socket = useSocket();
  const { me, room } = useRoom();
  const effectiveRoomId = room?.id || room?.roomId || roomId;
  const playersCount = room.players?.length || 0;
  const redTeamCount =
    room.players?.filter((player) => player.team?.toLowerCase() === "red")
      .length || 0;
  const blueTeamCount =
    room.players?.filter((player) => player.team?.toLowerCase() === "blue")
      .length || 0;

  const handleTeamSelect = (team) => {
    if (!me || !room || !socket) return;
    const nextTeam = me.team === team ? null : team;
    if (me.isReady) {
      socket.emit(SOCKET_EVENTS.TOGGLE_READY, {
        playerId: me.id,
        roomId: effectiveRoomId,
      });
    }
    socket.emit(SOCKET_EVENTS.SELECT_TEAM, {
      roomId: effectiveRoomId,
      playerId: me.id,
      team: nextTeam,
    });
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
