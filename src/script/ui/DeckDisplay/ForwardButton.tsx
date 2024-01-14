import { useContext } from "react"
import { Button } from "react-bootstrap"
import { AppState } from "../../App"
import AppMode from "../../app/AppMode"
import { AppStateType } from "../../state/AppState"

function ForwardButton() {

    const appState = useContext(AppState)

    return (
        <Button
            className="d-flex align-items-center flashcard-button flashcard-round-button"
            disabled={appState.deck === null || appState.deck.cards.length <= 1}
            onClick={() => {
              if (appState.appMode !== AppMode.REVIEWING_DECK || (
                appState.deck && 
                appState.visibleCardIndex !== appState.deck.cards.length - 1
              )) {
                viewNextCard(appState)
              } else {
                appState.setAppMode(AppMode.MANAGING_FILES)
              }
              
            }}
          >
            <span className="material-symbols-outlined">
              arrow_forward
            </span>
          </Button>
    )
}

function viewNextCard(state: AppStateType) {
    // If there are multiple cards in the deck, and the currently visible card 
    // isn't the last card, then add one to the current index to get the new 
    // visible card index.
    if (state.deck && state.deck.cards.length > 1 &&
      state.visibleCardIndex < state.deck.cards.length - 1) {
      state.setVisibleCardIndex(state.visibleCardIndex + 1)
    }
    // If there are multiple cards in the deck, and the currently visible card
    // is the last card, then set the new visible card index to the index of the 
    // first card in the deck.
    else if (state.deck && state.deck.cards.length > 1 &&
      state.visibleCardIndex === state.deck.cards.length - 1) {
      state.setVisibleCardIndex(0)
    }
    // Otherwise, there is only one card in the deck, and the visible card index 
    // does not need to change.
  }

export default ForwardButton