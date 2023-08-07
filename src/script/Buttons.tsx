import { Button } from "react-bootstrap";
import AppMode from "./app/AppMode";
import { addCard, setAppMode } from "./state/Store";
import { useDispatch } from "react-redux";

export type ButtonPropsType = {
  onClick: (event: React.MouseEvent | React.KeyboardEvent) => void
}

function AddCardButton() {

  const dispatch = useDispatch()

  return (
    <Button 
      onClick={() => {
        dispatch(addCard())
      }} 
      className="d-flex align-items-center flashcard-button border-0"
    >
      <span className="material-symbols-outlined" aria-hidden="true">add</span>
    </Button>
  )
}

function EditCardButton({ onClick }: ButtonPropsType) {
  return (
    <Button 
      onClick={onClick} 
      className="d-flex align-items-center flashcard-button border-0"
    >
      <span className="material-symbols-outlined" aria-hidden="true">edit</span>
    </Button>
  )
}

function DeleteCardButton({ onClick }: ButtonPropsType) {
  return (
    <Button 
      onClick={onClick} 
      className="d-flex align-items-center flashcard-button border-0 z-1"
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