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
  console.log(appState.reviewOrderProviderNextValue.value)
  console.log(appState.deck?.cards.length)
  console.trace()
  const [reviewingCardState, setReviewingCardState] = useState(ReviewingCardState.VIEWING_QUESTION_SIDE)

  // const next = useMemo(() => )
  // console.log(`next`)
  // console.log(next);
  

 

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
                      appState.setVisibleSide(appState.visibleSide === Side.FRONT ? Side.BACK : Side.FRONT)
                    }}>
                      View Answer
                    </Button>
                  )
                  :
                  (appState.reviewOrderProvider.peek().done) ?
                    (
                      <Button className="d-flex align-items-center flashcard-button" onClick={() => {
                        setReviewingCardState(ReviewingCardState.VIEWING_ANSWER_SIDE)
                        appState.setVisibleSide(Side.FRONT)
                        appState.setAppMode(AppMode.MANAGING_FILES)
                        appState.setVisibleCardIndex(0)

                        console.log("sdgjklajdflk");
                      }}>
                        Finish
                      </Button>
                    ) :
                    (
                      <Button className="d-flex align-items-center flashcard-button" onClick={() => {
                        setReviewingCardState(ReviewingCardState.VIEWING_QUESTION_SIDE);
                        appState.setVisibleSide(ShowSideProvider.get(appState.showSideProviderName)());

                        const next = appState.reviewOrderProvider.next()
                        // console.log(appState.reviewOrderProviderNextValue)
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