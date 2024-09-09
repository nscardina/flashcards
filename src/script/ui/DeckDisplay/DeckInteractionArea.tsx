import { Row } from "react-bootstrap"
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
      <div id="deck-interaction-area" className="mt-3">
        <div id="back-button-container">
          <BackButton />
        </div>
        <div id="card-display-container">
          {appState.appMode !== AppMode.REVIEWING_DECK && <CardDisplay />}
        </div>
        <div id="forward-button-container">
          <ForwardButton />
        </div>
      </div>
      <Row>
        {appState.appMode === AppMode.REVIEWING_DECK && appState.deck &&
          <ReviewCardPopover />
        }
      </Row>
    </>
  )

}

export default DeckInteractionArea