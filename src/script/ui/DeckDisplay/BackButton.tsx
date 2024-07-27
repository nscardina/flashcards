import { Button } from "react-bootstrap"
import AppMode from "../../app/AppMode"
import { useFCState } from "../../state/FCState"

function BackButton() {

  const appMode = useFCState(state => state.appMode);
  const deck = useFCState(state => state.deck);
  const visibleCardIndex = useFCState(state => state.visibleCardIndex);

  return (
    <Button
      disabled={deck === null || deck.cards.length <= 1}
      className="d-flex align-items-center flashcard-button flashcard-round-button"
      onClick={() => {
        console.log("sdfsfds")
        if (appMode !== AppMode.REVIEWING_DECK ||
          visibleCardIndex !== 0) {
          viewPreviousCard()
        }
      }}
    >
      <span className="material-symbols-outlined">
        arrow_back
      </span>
    </Button>
  )
}

function viewPreviousCard() {

  const deck = useFCState(state => state.deck);
  const [ visibleCardIndex, setVisibleCardIndex ] = useFCState(state => [state.visibleCardIndex, state.setVisibleCardIndex]);

    // If there are multiple cards in the deck, and the currently visible card 
    // isn't the first card, then subtract one from the current index to get the 
    // new visible card index.
    if (deck !== null && deck.cards.length > 1
    && visibleCardIndex > 0) {
    setVisibleCardIndex(visibleCardIndex - 1)
  }
  // If there are multiple cards in the deck, and the currently visible card 
  // is the first card, then set the new visible card index to the index of the 
  // last card in the deck.
  else if (deck !== null && deck.cards.length > 1 &&
    visibleCardIndex === 0) {
    setVisibleCardIndex(deck.cards.length - 1)
  }
  // Otherwise, there is only one card in the deck, and the visible card index 
  // does not need to change.
}

export default BackButton