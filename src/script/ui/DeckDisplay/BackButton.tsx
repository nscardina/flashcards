import { useContext } from "react"
import { Button } from "react-bootstrap"
import { AppState } from "../../App"
import AppMode from "../../app/AppMode"
import { AppStateType } from "../../state/AppState"

function BackButton() {

    const appState = useContext(AppState)

    return (
        <Button
            disabled={appState.deck === null || appState.deck.cards.length <= 1}
            className="d-flex align-items-center flashcard-button flashcard-round-button"
            onClick={() => {
              if (appState.appMode !== AppMode.REVIEWING_DECK || 
                appState.visibleCardIndex !== 0) {
                viewPreviousCard(appState)
              }
            }}
          >
            <span className="material-symbols-outlined">
              arrow_back
            </span>
          </Button>
    )
}

function viewPreviousCard(state: AppStateType) {
    // If there are multiple cards in the deck, and the currently visible card 
    // isn't the first card, then subtract one from the current index to get the 
    // new visible card index.
    if (state.deck !== null && state.deck.cards.length > 1
      && state.visibleCardIndex > 0) {
      state.setVisibleCardIndex(state.visibleCardIndex - 1)
    }
    // If there are multiple cards in the deck, and the currently visible card 
    // is the first card, then set the new visible card index to the index of the 
    // last card in the deck.
    else if (state.deck !== null && state.deck.cards.length > 1 &&
      state.visibleCardIndex === 0) {
      state.setVisibleCardIndex(state.deck.cards.length - 1)
    }
    // Otherwise, there is only one card in the deck, and the visible card index 
    // does not need to change.
  }

export default BackButton