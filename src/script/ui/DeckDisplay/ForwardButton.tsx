import { Button } from "react-bootstrap"
import AppMode from "../../app/AppMode"
import { useFCState } from "../../state/FCState"

function ForwardButton() {

  const appMode = useFCState(state => state.appMode);
  const deck = useFCState(state => state.deck);
  const setAppMode = useFCState(state => state.setAppMode);
  const visibleCardIndex = useFCState(state => state.visibleCardIndex);

  return (
    <Button
      className="d-flex align-items-center flashcard-button flashcard-round-button"
      disabled={deck === null || deck.cards.length <= 1}
      onClick={() => {
        if (appMode !== AppMode.REVIEWING_DECK || (
          deck &&
          visibleCardIndex !== deck.cards.length - 1
        )) {
          viewNextCard()
        } else {
          setAppMode(AppMode.MANAGING_FILES)
        }

      }}
    >
      <span className="material-symbols-outlined">
        arrow_forward
      </span>
    </Button>
  )
}

function viewNextCard() {

  const deck = useFCState(state => state.deck);
  const visibleCardIndex = useFCState(state => state.visibleCardIndex);
  const setVisibleCardIndex = useFCState(state => state.setVisibleCardIndex);

  // If there are multiple cards in the deck, and the currently visible card 
  // isn't the last card, then add one to the current index to get the new 
  // visible card index.
  if (deck && deck.cards.length > 1 &&
    visibleCardIndex < deck.cards.length - 1) {
    setVisibleCardIndex(visibleCardIndex + 1)
  }
  // If there are multiple cards in the deck, and the currently visible card
  // is the last card, then set the new visible card index to the index of the 
  // first card in the deck.
  else if (deck && deck.cards.length > 1 &&
    visibleCardIndex === deck.cards.length - 1) {
    setVisibleCardIndex(0)
  }
  // Otherwise, there is only one card in the deck, and the visible card index 
  // does not need to change.
}

export default ForwardButton