import { Col, Row } from "react-bootstrap"
import CardDisplay from "../CardDisplay/CardDisplay"
import AppMode from "../../app/AppMode"
import ReviewCardPopover from "../ReviewCardPopover"
import BackButton from "./BackButton"
import ForwardButton from "./ForwardButton"
import { useFCState } from "../../state/FCState"
import { useShallow } from "zustand/react/shallow"



function DeckInteractionArea() {

  const appMode = useFCState(state => state.appMode);
  const deck = useFCState(useShallow(state => state.deck));

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
        {appMode === AppMode.REVIEWING_DECK && deck && 
          <ReviewCardPopover />
        }
      </Row>
    </>
  )

}

export default DeckInteractionArea