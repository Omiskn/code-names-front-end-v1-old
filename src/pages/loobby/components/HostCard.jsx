import styles from "./HostCard.module.css";

const HostCard = ({ hostName, hostRole }) => {
  return (
    <div className={styles.hostCard}>
      <div className={styles.hostHeader}>
        <div className={styles.hostBadge}>👑 Host</div>
        <div className={styles.hostInfo}>
          <div className={styles.hostName}>{hostName}</div>
          <div className={styles.hostRole}>{hostRole}</div>
        </div>
      </div>
    </div>
  );
};

export default HostCard;
