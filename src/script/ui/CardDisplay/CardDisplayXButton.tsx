import { useShallow } from "zustand/react/shallow";
import { BoxNumber } from "../../card/Box";
import { Side } from "../../card/side";
import { useFCState } from "../../state/FCState";

export function CardDisplayXButton({ side, boxNumber }: { boxNumber: BoxNumber; side: Side; }) {

  const deck = useFCState(useShallow(state => state.deck));
  const visibleCardIndex = useFCState(state => state.visibleCardIndex);

  const setCards = useFCState(useShallow(state => state.setCards))

  return (
    <svg className={`flashcard-x-button-${boxNumber}`}
      style={{ width: "1rem", height: "1rem" }}
      onClick={(event) => {

        // Don't trigger the editor popover
        event.stopPropagation();

        if (deck) {

          const modifiedCard = structuredClone(deck.cards[visibleCardIndex]);
          modifiedCard[side].box[boxNumber] = null;
          
          setCards(
            [
              ...deck.cards.slice(0, visibleCardIndex),
              modifiedCard,
              ...deck.cards.slice(visibleCardIndex + 1)
            ]
          )
        }
      }}>
      <circle cx="50%" cy="50%" r="45%" fill="var(--bs-body-bg)" stroke="var(--bs-body-color)" strokeWidth="5%" />
      <line x1="25%" y1="25%" x2="75%" y2="75%" stroke="var(--bs-body-color)" strokeWidth="5%" />
      <line x1="25%" y1="75%" x2="75%" y2="25%" stroke="var(--bs-body-color)" strokeWidth="5%" />
    </svg>
  );
}
