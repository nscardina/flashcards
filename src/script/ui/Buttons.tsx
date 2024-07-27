import { Button } from "react-bootstrap";
import AppMode from "../app/AppMode";
import { Deck } from "../card/deck";
import { Card } from "../card/Card";
import { Side } from "../card/side";
import { useFCState } from "../state/FCState";
import { useShallow } from "zustand/react/shallow";

function createNewCard() {

  const deck = useFCState(useShallow(state => state.deck));
  const setDeck = useFCState(state => state.setDeck);
  const setCards = useFCState(state => state.setCards);
  const setAppMode = useFCState(state => state.setAppMode);
  const visibleCardIndex = useFCState(state => state.visibleCardIndex);
  const setVisibleCardIndex = useFCState(state => state.setVisibleCardIndex);

  // If no deck is loaded yet, create a new empty deck
  if (deck === null) {
    // Create an empty deck, set the app mode to EDITING_DECK, set the only 
    // card in the deck to be visible.
    setDeck(Deck.makeDefault())
    setAppMode(AppMode.EDITING_DECK)
    setVisibleCardIndex(0)
  } else {
    // Create a deck containing all existing cards, and insert a new blank card 
    // after the currently visible card. Set the new card as the currently 
    // visible card.
    setCards([
        ...deck.cards.slice(0, visibleCardIndex + 1),
        Card.makeDefault(),
        ...deck.cards.slice(visibleCardIndex + 1)
      ]
    )
    setVisibleCardIndex(visibleCardIndex + 1);
  }
}



function deleteCard(index: number) {

  const deck = useFCState(useShallow(state => state.deck));
  const setCards = useFCState(state => state.setCards);
  const setAppMode = useFCState(state => state.setAppMode);
  const visibleCardIndex = useFCState(state => state.visibleCardIndex);
  const setVisibleCardIndex = useFCState(state => state.setVisibleCardIndex);

  // If the deck only contains one card, create a new deck with only one empty 
  // card in it. Set the app mode to EDITING_DECK.
  if (deck !== null && index === 0 && deck.cards.length === 1) {
    setCards([Card.makeDefault()])
    setVisibleCardIndex(0)
    setAppMode(AppMode.EDITING_DECK)
  }
  // If there is more than one card in the deck, and the card to be deleted is 
  // in the deck (which should always be the case), 
  else if (deck !== null && index >= 0 && index < deck.cards.length)
  {
    deck.cards.splice(index, 1)

    // If the currently visible card should be deleted...
    if (index === visibleCardIndex) {
      // If the currently visible card is the first one in the deck, set the 
      // visible card to the last card in the deck (which is guaranteed to 
      // exist, as the deck will always have at least two cards at this point).
      if (visibleCardIndex === 0) {
        setVisibleCardIndex(deck.cards.length - 1)
      }
      // If the currently visible card is not the first one in the deck, then 
      // set the currently visible card to the previous one in the deck.
      else {
        setVisibleCardIndex(visibleCardIndex - 1)
      }
    }
    // If the card to be deleted is greater than or equal to the length of the 
    // new array of cards (which means that the last card was deleted), then 
    // set the new last card to be visible.
    else if (index >= deck.cards.length) {
      setVisibleCardIndex(deck.cards.length - 1)
    }
    // Otherwise, the currently visible card does not need to be changed.

    setAppMode(AppMode.EDITING_DECK)
  }
}

export type ButtonPropsType = {
  onClick: (event: React.MouseEvent | React.KeyboardEvent) => void
}

function AddCardButton() {

  return (
    <Button
      onClick={() => createNewCard()}
      className="d-flex align-items-center flashcard-button border-0"
    >
      <span className="material-symbols-outlined" aria-hidden="true">add</span>
    </Button>
  )
}

function EditCardButton() {

  const deck = useFCState(useShallow(state => state.deck));
  const setAppMode = useFCState(state => state.setAppMode);

  return (
    <Button
      disabled={!deck}
      onClick={() => setAppMode(AppMode.EDITING_DECK)}
      className="d-flex align-items-center flashcard-button border-0"
    >
      <span className="material-symbols-outlined" aria-hidden="true">edit</span>
    </Button>
  )
}

function DeleteCardButton() {

  const deck = useFCState(useShallow(state => state.deck));
  const visibleCardIndex = useFCState(state => state.visibleCardIndex);

  return (
    <Button
      disabled={!deck}
      className="d-flex align-items-center flashcard-button border-0 z-1"
      onClick={() => deleteCard(visibleCardIndex)}
    >
      <span className="material-symbols-outlined" aria-hidden="true">
        close
      </span>
    </Button>
  )
}

function ReviewDeckButton({ onClick }: ButtonPropsType) {

  const deck = useFCState(useShallow(state => state.deck));

  return (
    <Button onClick={onClick} disabled={deck === null}>
      Review
    </Button>
  )
}

function DoneButton() {

  const setAppMode = useFCState(state => state.setAppMode);

  return (
    <Button onClick={() => setAppMode(AppMode.MANAGING_FILES)}>
      Done
    </Button>
  )
}

function FlipCardButton() {

  const deck = useFCState(useShallow(state => state.deck));
  const visibleSide = useFCState(state => state.visibleSide);
  const setVisibleSide = useFCState(state => state.setVisibleSide);

  return (
    <Button onClick={() => {
      if (visibleSide === Side.FRONT) {
        setVisibleSide(Side.BACK)
      } else {
        setVisibleSide(Side.FRONT)
      }
    }} disabled={!deck}
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