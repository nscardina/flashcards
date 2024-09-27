import { useContext, useState } from "react"
import { AppState } from "../App"
import { Button, Col, Container, Modal, Row } from "react-bootstrap"
import CardDisplay from "../card/card_display/CardDisplay"
import { Side } from "../card/side"
import ShowSideProvider from "../ShowSideProvider"
import AppMode from "../app/AppMode"
import "./ReviewCardPopover.scss"

enum ReviewingCardState {
  VIEWING_QUESTION_SIDE,
  VIEWING_ANSWER_SIDE
}

function ReviewCardPopover() {
  const appState = useContext(AppState)

  const [reviewingCardState, setReviewingCardState] = useState(ReviewingCardState.VIEWING_QUESTION_SIDE)
  const [showAnimationState, setShowAnimationState] = useState(true);
  
  return (
    <Modal show={true} dialogClassName="review-card-popover">
      <Modal.Header>
        <Modal.Title>Review Cards</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Row className="card-display-container">
            <CardDisplay 
            style={{padding: "0px", height: "unset"}} 
            className={showAnimationState ? "" : "flashcard-face-no-animation"}
            />
          </Row>
          <Row className="mt-3">
            <Col className="d-flex flex-row justify-content-center">
              {
                (reviewingCardState === ReviewingCardState.VIEWING_QUESTION_SIDE) ?
                  (
                    <Button className="d-flex align-items-center flashcard-button" onClick={() => {
                      setShowAnimationState(true);
                      setReviewingCardState(ReviewingCardState.VIEWING_ANSWER_SIDE);
                      appState.setVisibleSide(appState.visibleSide === Side.FRONT ? Side.BACK : Side.FRONT);
                    }}>
                      View Answer
                    </Button>
                  )
                  :
                  (appState.reviewOrderProvider.peek().done) ?
                    (
                      <Button className="d-flex align-items-center flashcard-button" onClick={() => {
                        setReviewingCardState(ReviewingCardState.VIEWING_ANSWER_SIDE);
                        
                        appState.setVisibleSide(Side.FRONT);
                        appState.setAppMode(AppMode.MANAGING_FILES);
                        appState.setVisibleCardIndex(0);
                        setShowAnimationState(true);
                      }}>
                        Finish
                      </Button>
                    ) :
                    (
                      <Button className="d-flex align-items-center flashcard-button" onClick={() => {
                        setReviewingCardState(ReviewingCardState.VIEWING_QUESTION_SIDE);
                        setShowAnimationState(false);
                        appState.setVisibleSide(ShowSideProvider.get(appState.showSideProviderName)());
                        

                        const next = appState.reviewOrderProvider.next()
                        appState.setReviewOrderProviderNextValue(next);
                        if (typeof (next.value) === "number") {
                          appState.setVisibleCardIndex(next.value);
                        }
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