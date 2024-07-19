import { Button, Col, Container, Modal, Row } from "react-bootstrap"
import Dialog from "../app/Dialog"
import { downloadDeck } from "../file/CardFile"
import { useFCState } from "../state/FCState"

function DeleteDeckConfirmationMessage() {

  const deck = useFCState(state => state.deck);
  const setDeck = useFCState(state => state.setDeck);
  const setVisibleCardIndex = useFCState(state => state.setVisibleCardIndex);
  const setVisibleDialog = useFCState(state => state.setVisibleDialog);

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
                  setVisibleDialog(Dialog.NONE)}
              >
                Cancel
              </Button>
            </Col>
            <Col xs="auto"
              className="d-inline-block">
              <Button variant="danger" className="me-3"
                onClick={() => {
                  setDeck(null)
                  setVisibleCardIndex(-1)
                  setVisibleDialog(Dialog.NONE)
                }}
              >Delete Deck</Button>
              <Button
                onClick={deck !== null ?
                  () => {
                    downloadDeck(deck!)
                    setVisibleDialog(Dialog.NONE)
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