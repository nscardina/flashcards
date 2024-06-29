import { Side } from "../side";
import { BoxNumber } from "../Box";
import { useContext } from "react";
import { AppState } from "../../App";

export function CardDisplayXButton({ side, boxNumber }: { boxNumber: BoxNumber; side: Side; }) {

  const appState = useContext(AppState);

  return (
    <svg className={`flashcard-x-button-${boxNumber}`}
      style={{ width: "1rem", height: "1rem" }}
      onClick={(event) => {

        // Don't trigger the editor popover
        event.stopPropagation();

        if (appState.deck) {

          const modifiedCard = structuredClone(appState.deck.cards[appState.visibleCardIndex]);
          modifiedCard[side].box[boxNumber] = null;

          appState.setDeck({
            ...appState.deck,
            cards: [
              ...appState.deck.cards.slice(0, appState.visibleCardIndex),
              modifiedCard,
              ...appState.deck.cards.slice(appState.visibleCardIndex + 1)
            ]
          });
        }
      }}>
      <circle cx="50%" cy="50%" r="45%" fill="var(--bs-body-bg)" stroke="var(--bs-body-color)" strokeWidth="5%" />
      <line x1="25%" y1="25%" x2="75%" y2="75%" stroke="var(--bs-body-color)" strokeWidth="5%" />
      <line x1="25%" y1="75%" x2="75%" y2="25%" stroke="var(--bs-body-color)" strokeWidth="5%" />
    </svg>
  );
}
