import { Button, Col, Row } from "react-bootstrap"
import CardDisplay from "../card/CardDisplay"
import { useContext } from "react"
import { AppState } from "../App"
import { AppStateType } from "../state/AppState"

function viewPreviousCard(state: AppStateType) {
  // If there are multiple cards in the deck, and the currently visible card 
  // isn't the first card, then subtract one from the current index to get the 
  // new visible card index.
  if (state.deck !== null && state.deck.cards.length > 1 
    && state.visibleCardIndex > 0)
  {
    state.setVisibleCardIndex(state.visibleCardIndex - 1)
  }
  // If there are multiple cards in the deck, and the currently visible card 
  // is the first card, then set the new visible card index to the index of the 
  // last card in the deck.
  else if (state.deck !== null && state.deck.cards.length > 1 && 
    state.visibleCardIndex === 0)
  {
    state.setVisibleCardIndex(state.deck.cards.length - 1)
  }
  // Otherwise, there is only one card in the deck, and the visible card index 
  // does not need to change.
}

function viewNextCard(state: AppStateType) {
  // If there are multiple cards in the deck, and the currently visible card 
  // isn't the last card, then add one to the current index to get the new 
  // visible card index.
  if (state.deck && state.deck.cards.length > 1 &&
    state.visibleCardIndex < state.deck.cards.length - 1)
  {
    state.setVisibleCardIndex(state.visibleCardIndex + 1)
  }
  // If there are multiple cards in the deck, and the currently visible card
  // is the last card, then set the new visible card index to the index of the 
  // first card in the deck.
  else if (state.deck && state.deck.cards.length > 1 && 
    state.visibleCardIndex === state.deck.cards.length - 1)
  {
    state.setVisibleCardIndex(0)
  }
  // Otherwise, there is only one card in the deck, and the visible card index 
  // does not need to change.
}

function DeckInteractionArea() {

  const appState = useContext(AppState)

  return (
    <Row className="mt-3 d-flex">
      <Col xs={{ span: 6, order: 2 }} md={{ span: 1, order: 1 }}
        className="d-flex align-items-center justify-content-center"
      >
        <Button 
          disabled={appState.deck === null || appState.deck.cards.length <= 1} 
          className="d-flex align-items-center flashcard-button flashcard-round-button"
          onClick={() => viewPreviousCard(appState)}
        >
          <span className="material-symbols-outlined">
            arrow_back
          </span>
        </Button>
      </Col>
      <Col xs={{ span: 12, order: 1 }} md={{ span: 10, order: 2 }}>
        <CardDisplay />
      </Col>
      <Col xs={{ span: 6, order: 3 }} md={{ span: 1, order: 3 }} className="d-flex align-items-center justify-content-center">
        <Button 
          className="d-flex align-items-center flashcard-button flashcard-round-button"
          disabled={appState.deck === null || appState.deck.cards.length <= 1} 
          onClick={() => viewNextCard(appState)}
        >
          <span className="material-symbols-outlined">
            arrow_forward
          </span>
        </Button>
      </Col>
    </Row>
  )

}

export default DeckInteractionArea