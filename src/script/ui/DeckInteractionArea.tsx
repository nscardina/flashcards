import { Button, Col, Row } from "react-bootstrap"
import CardDisplay from "../card/CardDisplay"
import { useDispatch, useSelector } from "react-redux"
import { selectDeck } from "../state/Store"
import { viewNextCard, viewPreviousCard } from "../state/deck_actions"

function DeckInteractionArea() {

  const deck = useSelector(selectDeck)
  const dispatch = useDispatch()

  return (
    <Row className="mt-3 d-flex">
      <Col xs={{ span: 6, order: 2 }} md={{ span: 1, order: 1 }}
        className="d-flex align-items-center justify-content-center"
      >
        <Button 
          disabled={deck === null || deck.cards.length <= 1} 
          className="d-flex align-items-center flashcard-button flashcard-round-button"
          onClick={() => dispatch(viewPreviousCard())}
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
          disabled={deck === null || deck.cards.length <= 1} 
          onClick={() => dispatch(viewNextCard())}
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