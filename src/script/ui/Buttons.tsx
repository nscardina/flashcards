import { Button } from "react-bootstrap";
import AppMode from "../app/AppMode";
import { useContext } from "react";
import { AppState } from "../App";
import { AppStateType } from "../state/AppState";
import { Editor } from "../app/Editor";
import { Deck } from "../card/deck";
import { Card } from "../card/Card";
import { Side } from "../card/side";

function createNewCard(state: AppStateType) {
  // If no deck is loaded yet, create a new empty deck
  if (state.deck === null) {
    // Create an empty deck, set the app mode to EDITING_DECK, set the only 
    // card in the deck to be visible.
    state.setDeck(Deck.makeDefault())
    state.setAppMode(AppMode.EDITING_DECK)
    state.setVisibleCardIndex(0)
  } else {
    // Create a deck containing all existing cards, and insert a new blank card 
    // after the currently visible card. Set the new card as the currently 
    // visible card.
    state.setDeck({
      ...state.deck,
      cards: [
        ...state.deck.cards.slice(0, state.visibleCardIndex + 1),
        Card.makeDefault(),
        ...state.deck.cards.slice(state.visibleCardIndex + 1)
      ]
    })
    state.setBoxBeingEdited(null),
    state.setVisibleEditor(Editor.NONE),
    state.setVisibleCardIndex(state.visibleCardIndex + 1)
  }
}



function deleteCard(state: AppStateType, index: number) {
  // If the deck only contains one card, create a new deck with only one empty 
  // card in it. Set the app mode to EDITING_DECK.
  if (state.deck !== null && index === 0 && state.deck.cards.length === 1) {
    state.setDeck({
      ...state.deck,
      cards: [Card.makeDefault()]
    })
    state.setVisibleCardIndex(0)
    state.setAppMode(AppMode.EDITING_DECK)
  }
  // If there is more than one card in the deck, and the card to be deleted is 
  // in the deck (which should always be the case), 
  else if (state.deck !== null && index >= 0 && index < state.deck.cards.length)
  {
    state.deck.cards.splice(index, 1)

    // If the currently visible card should be deleted...
    if (index === state.visibleCardIndex) {
      // If the currently visible card is the first one in the deck, set the 
      // visible card to the last card in the deck (which is guaranteed to 
      // exist, as the deck will always have at least two cards at this point).
      if (state.visibleCardIndex === 0) {
        state.setVisibleCardIndex(state.deck.cards.length - 1)
      }
      // If the currently visible card is not the first one in the deck, then 
      // set the currently visible card to the previous one in the deck.
      else {
        state.setVisibleCardIndex(state.visibleCardIndex - 1)
      }
    }
    // If the card to be deleted is greater than or equal to the length of the 
    // new array of cards (which means that the last card was deleted), then 
    // set the new last card to be visible.
    else if (index >= state.deck.cards.length) {
      state.setVisibleCardIndex(state.deck.cards.length - 1)
    }
    // Otherwise, the currently visible card does not need to be changed.

    state.setAppMode(AppMode.EDITING_DECK)
  }
}

export type ButtonPropsType = {
  onClick: (event: React.MouseEvent | React.KeyboardEvent) => void
}

function AddCardButton() {

  const appState = useContext(AppState)

  return (
    <Button
      onClick={() => createNewCard(appState)}
      className="d-flex align-items-center flashcard-button border-0"
    >
      <span className="material-symbols-outlined" aria-hidden="true">add</span>
    </Button>
  )
}

function EditCardButton() {

  const appState = useContext(AppState)

  return (
    <Button
      disabled={!appState.deck}
      onClick={() => appState.setAppMode(AppMode.EDITING_DECK)}
      className="d-flex align-items-center flashcard-button border-0"
    >
      <span className="material-symbols-outlined" aria-hidden="true">edit</span>
    </Button>
  )
}

function DeleteCardButton() {

  const appState = useContext(AppState)

  return (
    <Button
      disabled={!appState.deck}
      className="d-flex align-items-center flashcard-button border-0 z-1"
      onClick={() => deleteCard(appState, appState.visibleCardIndex)}
    >
      <span className="material-symbols-outlined" aria-hidden="true">
        close
      </span>
    </Button>
  )
}

function ReviewDeckButton({ onClick }: ButtonPropsType) {
  return (
    <Button onClick={onClick}>
      Review
    </Button>
  )
}

function DoneButton() {

  const appState = useContext(AppState)

  return (
    <Button onClick={() => appState.setAppMode(AppMode.MANAGING_FILES)}>
      Done
    </Button>
  )
}

function FlipCardButton() {
  const appState = useContext(AppState)

  return (
    <Button onClick={() => {
      if (appState.visibleSide === Side.FRONT) {
        appState.setVisibleSide(Side.BACK)
      } else {
        appState.setVisibleSide(Side.FRONT)
      }
    }} disabled={!appState.deck}
    className="d-flex align-items-center flashcard-button border-0 z-1">
      <span className="material-symbols-outlined" aria-hidden="true">
        flip
      </span>
    </Button>
  )
}

export {
  AddCardButton,
  EditCardButton,
  DeleteCardButton,
  ReviewDeckButton,
  DoneButton,
  FlipCardButton
}