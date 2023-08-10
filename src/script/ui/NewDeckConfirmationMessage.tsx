import { Button, Col, Container, Modal, Row } from "react-bootstrap"
import { useDispatch } from "react-redux"
import { changeDialog, deleteDeck } from "../state/Store"
import Dialog from "../app/Dialog"

function NewDeckConfirmationMessage() {

  const dispatch = useDispatch()

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
                  dispatch(changeDialog(Dialog.NONE))}
              >
                Cancel
              </Button>
            </Col>
            <Col xs="auto"
              className="d-inline-block">
              <Button variant="danger" className="me-3"
                onClick={() => dispatch(deleteDeck())}
              >Delete Deck</Button>
              <Button>Save Deck...</Button>
            </Col>
          </Row>



        </Container>

      </Modal.Body>
    </Modal>
  )
}

export default NewDeckConfirmationMessage