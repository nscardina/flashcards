import { Col, Row } from "react-bootstrap"
import CardDisplay from "../../card/card_display/CardDisplay"
import { useContext } from "react"
import { AppState } from "../../App"
import AppMode from "../../app/AppMode"
import ReviewCardPopover from "../ReviewCardPopover"
import BackButton from "./BackButton"
import ForwardButton from "./ForwardButton"



function DeckInteractionArea() {

  const appState = useContext(AppState)

  return (
    <>
      <Row className="mt-3 d-flex">
        <Col xs={{ span: 6, order: 2 }} md={{ span: "auto", order: 1 }}
          className="d-flex align-items-center justify-content-center ms-auto"
        >
          <BackButton />
        </Col>
        <Col xs={{ span: 12, order: 1 }} md={{ span: "auto", order: 2 }}>
          <CardDisplay forceAspectRatio={true} fillAvailableSpace={true}/>
        </Col>
        <Col xs={{ span: 6, order: 3 }} md={{ span: "auto", order: 3 }} 
          className="d-flex align-items-center justify-content-center me-auto"
        >
          <ForwardButton />
        </Col>
      </Row>
      <Row className="mt-3 d-flex">
        {appState.appMode === AppMode.REVIEWING_DECK && appState.deck && 
          <ReviewCardPopover />
        }
      </Row>
    </>
  )

}

export default DeckInteractionArea