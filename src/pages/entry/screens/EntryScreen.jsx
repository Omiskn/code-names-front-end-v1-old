// EntryScreen.jsx
import styles from "./EntryScreen.module.css";
import CreateGameCard from "../components/CreateGameCard";
import JoinGameCard from "../components/JoinGameCard";

const EntryScreen = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Code Names</h1>
        <CreateGameCard />
        <JoinGameCard />
      </div>
    </div>
  );
};

export default EntryScreen;
