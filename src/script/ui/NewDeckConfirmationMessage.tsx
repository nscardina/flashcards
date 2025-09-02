import { Button, Col, Container, Modal, Row } from "react-bootstrap"
import Dialog from "../app/Dialog"
import { useContext } from "react"
import { AppState } from "../App"
import { downloadDeck } from "../file/CardFile"
import { Deck } from "../card/deck"

function NewDeckConfirmationMessage() {

  const appState = useContext(AppState)

  return (
    <Modal show={true}>
      <Modal.Header>
        <Modal.Title>
          Delete Existing Deck?
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Container className="">
          <Row>
            A deck is already open. Creating a new deck requires the current
            deck
            to be closed. All changes will be lost. Do you want to proceed?
          </Row>
          <Row>
            <Col className="d-inline-block me-auto">
              <Button
                onClick={() =>
                  appState.setVisibleDialog(Dialog.NONE)}
              >
                Cancel
              </Button>
            </Col>
            <Col xs="auto"
              className="d-inline-block">
              <Button variant="danger" className="me-3"
                onClick={() => {
                  appState.setDeck(Deck.makeDefault())
                  appState.setVisibleCardIndex(0)
                  appState.setVisibleDialog(Dialog.NONE)
                  appState.setChangesMade(false)
                }}
              >Delete Deck</Button>
              <Button
                onClick={appState.deck !== null ?
                  () => {
                    downloadDeck(appState.deck!)
                    appState.setVisibleDialog(Dialog.NONE)
                    appState.setChangesMade(false);
                  } :
                  () => { }}
              >
                Save Deck...
              </Button>
            </Col>
          </Row>



        </Container>

      </Modal.Body>
    </Modal>
  )
}

export default NewDeckConfirmationMessage