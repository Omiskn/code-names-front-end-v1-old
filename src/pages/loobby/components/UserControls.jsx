// UserControls.jsx (updated)
import TeamSelection from "./TeamSelection";
import RoleSelection from "./RoleSelection";
import styles from "./UserControls.module.css";
import { useRoom } from "../../../contexts/roomContext";
import { useSocket } from "../../../contexts/socketContext";
import { SOCKET_EVENTS } from "../../../config";

const UserControls = () => {
  const { me, room } = useRoom();
  const socket = useSocket();

  const handleReadyToggle = () => {
    if (!me || !room || !socket) return;
    if (me.team && me.role) {
      const roomId = room.id || room.roomId || localStorage.getItem("roomId");
      socket.emit(SOCKET_EVENTS.TOGGLE_READY, {
        playerId: me.id,
        roomId,
      });
    }
  };

  // Check if both team and role are selected
  const isReadyButtonDisabled = !me || !me.team || !me.role;

  return (
    <div className={styles.rightColumn}>
      <div className={styles.userControls}>
        <TeamSelection />
        <RoleSelection />
        <button
          className={`${styles.readyButton} ${
            me?.isReady ? styles.readyActive : ""
          }`}
          onClick={handleReadyToggle}
          disabled={isReadyButtonDisabled}
        >
          <span className={styles.readyIcon}>{me?.isReady ? "✓" : "○"}</span>
          {me?.isReady ? "Cancel Ready" : "Ready!"}
        </button>
      </div>
    </div>
  );
};

export default UserControls;
