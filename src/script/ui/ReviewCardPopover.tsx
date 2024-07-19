import { useState } from "react"
import { Button, Col, Container, Modal, Row } from "react-bootstrap"
import { Side } from "../card/side"
import ShowSideProvider from "../ShowSideProvider"
import AppMode from "../app/AppMode"
import "./ReviewCardPopover.scss"
import CardDisplay from "./CardDisplay/CardDisplay"
import { useFCState } from "../state/FCState"

enum ReviewingCardState {
  VIEWING_QUESTION_SIDE,
  VIEWING_ANSWER_SIDE
}

function ReviewCardPopover() {

  const [reviewingCardState, setReviewingCardState] = useState(ReviewingCardState.VIEWING_QUESTION_SIDE)

  const [ visibleSide, setVisibleSide ] = useFCState(state => [state.visibleSide, state.setVisibleSide]);
  const [ visibleCardIndex, setVisibleCardIndex ] = useFCState(state => [ state.visibleCardIndex, state.setVisibleCardIndex ]);
  const deck = useFCState(state => state.deck);
  const setAppMode = useFCState(state => state.setAppMode);
  const showSideProviderName = useFCState(state => state.showSideProviderName);

  return (
    <Modal show={true} dialogClassName="review-card-popover">
      <Modal.Header>
        <Modal.Title>Review Cards</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Row>
            <CardDisplay position="relative" forceAspectRatio={true} />
          </Row>
          <Row className="mt-3">
            <Col className="d-flex flex-row justify-content-center">
              {
                (reviewingCardState === ReviewingCardState.VIEWING_QUESTION_SIDE) ?
                  (
                    <Button className="d-flex align-items-center flashcard-button" onClick={() => {
                      setReviewingCardState(ReviewingCardState.VIEWING_ANSWER_SIDE)
                      setVisibleSide(visibleSide === Side.FRONT ? Side.BACK : Side.FRONT)
                    }}>
                      View Answer
                    </Button>
                  )
                  :
                  (visibleCardIndex === deck!.cards.length - 1) ?
                    (
                      <Button className="d-flex align-items-center flashcard-button" onClick={() => {
                        setReviewingCardState(ReviewingCardState.VIEWING_ANSWER_SIDE)
                        setVisibleSide(Side.FRONT)
                        setAppMode(AppMode.MANAGING_FILES)
                        setVisibleCardIndex(0)
                      }}>
                        Finish
                      </Button>
                    ) :
                    (
                      <Button className="d-flex align-items-center flashcard-button" onClick={() => {
                        setReviewingCardState(ReviewingCardState.VIEWING_QUESTION_SIDE)
                        setVisibleSide(ShowSideProvider.get(showSideProviderName)())
                      }}>
                        Next Card
                      </Button>
                    )
              }
            </Col>

          </Row>
        </Container>


      </Modal.Body>
    </Modal>
  )
}

export default ReviewCardPopover