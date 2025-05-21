import { Button, Col, Container, Modal, Row } from "react-bootstrap"
import Dialog from "../app/Dialog"
import { useContext } from "react"
import { AppState } from "../App"
import { deleteCard } from "./Buttons"

function DeleteCardConfirmationMessage() {

  const appState = useContext(AppState)

  return (
    <Modal show={true}>
      <Modal.Header>
        <Modal.Title>
          Delete card?
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Container className="">
          <Row>
            The current card will be deleted. Do you want to proceed?
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
                  deleteCard(appState, appState.visibleCardIndex)
                  appState.setVisibleDialog(Dialog.NONE)
                }}
              >Delete Card</Button>
            </Col>
          </Row>



        </Container>

      </Modal.Body>
    </Modal>
  )
}

export default DeleteCardConfirmationMessage