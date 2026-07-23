import { COLORS } from "../../../config";
import { useRoom } from "../../../contexts/roomContext";
import styles from "./BoardGrid.module.css";
import Card from "./Card";

const BoardGrid = () => {
  const { room } = useRoom();
  const cards = room.game?.board.cards;
  return (
    <div className={styles.boardContainer}>
      <div className={styles.boardGrid}>
        {cards?.map((card) => (
          <div key={card.id} className={styles.cardWrapper}>
            <Card
              color={card.type !== null ? COLORS[card.type] : COLORS.neutral}
              word={card.word}
              cardId={card.id}
              type={card.type}
              revealed={card.revealed}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BoardGrid;
