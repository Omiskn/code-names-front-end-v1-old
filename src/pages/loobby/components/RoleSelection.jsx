// RoleSelection.jsx (updated)
import styles from "./RoleSelection.module.css";
import { useSocket } from "../../../contexts/socketContext";
import { SOCKET_EVENTS } from "../../../config";
import { useRoom } from "../../../contexts/roomContext";

const RoleSelection = () => {
  const { me, room } = useRoom();
  const roomId = localStorage.getItem("roomId");
  const socket = useSocket();

  const effectiveRoomId = room?.id || room?.roomId || roomId;

  const handleRoleSelect = (role) => {
    if (!me || !room || !socket) return;
    const nextRole = me.role === role ? null : role;

    if (me.isReady) {
      socket.emit(SOCKET_EVENTS.TOGGLE_READY, {
        playerId: me.id,
        roomId: effectiveRoomId,
      });
    }
    socket.emit(SOCKET_EVENTS.SELECT_ROLE, {
      roomId: effectiveRoomId,
      playerId: me.id,
      role: nextRole,
    });
  };
  return (
    <div className={styles.controlGroup}>
      <h4 className={styles.controlTitle}>Choose Your Role</h4>
      <div className={styles.roleSelection}>
        <button
          className={`${styles.roleBtn} ${styles.spymasterBtn} ${
            me?.role === "spymaster" ? styles.selected : ""
          }`}
          onClick={() => handleRoleSelect("spymaster")}
        >
          <div className={styles.roleBtnContent}>
            {/* <div className={styles.roleIcon}>🎯</div> */}
            <div className={styles.roleInfo}>
              <div className={styles.roleName}>Spymaster</div>
              <div className={styles.roleDesc}>Give clues</div>
            </div>
            <div className={styles.checkmark}>
              {me?.role === "spymaster" && "✓"}
            </div>
          </div>
        </button>
        <button
          className={`${styles.roleBtn} ${styles.operativeBtn} ${
            me?.role === "operative" ? styles.selected : ""
          }`}
          onClick={() => handleRoleSelect("operative")}
        >
          <div className={styles.roleBtnContent}>
            {/* <div className={styles.roleIcon}>🔍</div> */}
            <div className={styles.roleInfo}>
              <div className={styles.roleName}>Operative</div>
              <div className={styles.roleDesc}>Guess words</div>
            </div>
            <div className={styles.checkmark}>
              {me?.role === "operative" && "✓"}
            </div>
          </div>
        </button>
      </div>
    </div>
  );
};

export default RoleSelection;
