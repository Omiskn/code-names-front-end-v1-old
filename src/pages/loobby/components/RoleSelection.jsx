// RoleSelection.jsx (updated)
import styles from "./RoleSelection.module.css";
import { useSocket } from "../../../contexts/socketContext";
import { SOCKET_EVENTS } from "../../../config";
import { useRoom } from "../../../contexts/roomContext";

const RoleSelection = () => {
  const { me, room } = useRoom();
  const playerId = localStorage.getItem("playerId");
  const roomId = localStorage.getItem("roomId");
  const socket = useSocket();

  // const { updatePlayers, room } = useRoom();
  // 'spymaster' or 'operative'

  const handleRoleSelect = (role) => {
    if (!me || !room) return;
    // TODO: emit socket event for role selection

    // Toggle: if same role is clicked, deselect it, otherwise select the new role
    me.role = me.role === role ? null : role;

    if (me.isReady) {
      socket.emit(SOCKET_EVENTS.TOGGLE_READY, {
        playerId: me.id,
        roomId: room.id,
      });
    }
    socket.emit(SOCKET_EVENTS.SELECT_ROLE, { roomId, playerId, role: me.role });
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
