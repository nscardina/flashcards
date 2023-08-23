import { Button } from "react-bootstrap";
import AppMode from "../app/AppMode";
import { selectDeck, selectVisibleCardIndex } from "../state/Store";
import { useDispatch, useSelector } from "react-redux";
import { createNewCard, deleteCard } from "../state/deck_actions";
import { setAppMode } from "../state/setters";

export type ButtonPropsType = {
  onClick: (event: React.MouseEvent | React.KeyboardEvent) => void
}

function AddCardButton() {

  const dispatch = useDispatch()

  return (
    <Button 
      onClick={() => {
        dispatch(createNewCard())
      }} 
      className="d-flex align-items-center flashcard-button border-0"
    >
      <span className="material-symbols-outlined" aria-hidden="true">add</span>
    </Button>
  )
}

function EditCardButton() {

  const dispatch = useDispatch()
  const deck = useSelector(selectDeck)

  return (
    <Button 
      disabled={!deck}
      onClick={() => dispatch(setAppMode(AppMode.EDITING_DECK))} 
      className="d-flex align-items-center flashcard-button border-0"
    >
      <span className="material-symbols-outlined" aria-hidden="true">edit</span>
    </Button>
  )
}

function DeleteCardButton() {

  const deck = useSelector(selectDeck)
  const visibleCardIndex = useSelector(selectVisibleCardIndex)
  const dispatch = useDispatch()

  return (
    <Button 
      disabled={!deck}
      className="d-flex align-items-center flashcard-button border-0 z-1"
      onClick={() => dispatch(deleteCard(visibleCardIndex))}
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

function EditingDoneButton() {

  const dispatch = useDispatch()

  return (
    <Button onClick={() => dispatch(setAppMode(AppMode.MANAGING_FILES))}>
      Done
    </Button>
  )
}

export {
  AddCardButton,
  EditCardButton,
  DeleteCardButton,
  ReviewDeckButton,
  EditingDoneButton,
}