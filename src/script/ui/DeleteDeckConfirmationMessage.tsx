import { Button, Col, Container, Modal, Row } from "react-bootstrap"
import Dialog from "../app/Dialog"
import { useContext } from "react"
import { AppState } from "../App"
import { downloadDeck } from "../file/CardFile"

function DeleteDeckConfirmationMessage() {

  const appState = useContext(AppState)

  return (
    <Modal show={true}>
      <Modal.Header>
        <Modal.Title>
          Close Deck?
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Container className="">
          <Row>
            All changes will be lost. Do you want to proceed?
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
                  appState.setDeck(null)
                  appState.setVisibleCardIndex(-1)
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

export default DeleteDeckConfirmationMessage