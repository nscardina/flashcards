import { Button, Col, Container, Modal, Row } from "react-bootstrap"
import Dialog from "../app/Dialog"
import { downloadDeck } from "../file/CardFile"
import { Deck } from "../card/deck"
import { useFCState } from "../state/FCState"
import { useShallow } from "zustand/react/shallow"

function NewDeckConfirmationMessage() {

  const setVisibleDialog = useFCState(state => state.setVisibleDialog);
  const deck = useFCState(useShallow(state => state.deck));
  const setDeck = useFCState(state => state.setDeck);
  const setVisibleCardIndex = useFCState(state => state.setVisibleCardIndex);

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
                  setVisibleDialog(Dialog.NONE)}
              >
                Cancel
              </Button>
            </Col>
            <Col xs="auto"
              className="d-inline-block">
              <Button variant="danger" className="me-3"
                onClick={() => {
                  setDeck(Deck.makeDefault())
                  setVisibleCardIndex(0)
                  setVisibleDialog(Dialog.NONE)
                }}
              >Delete Deck</Button>
              <Button
                onClick={deck !== null ?
                  () => {
                    downloadDeck(deck)
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

export default NewDeckConfirmationMessage