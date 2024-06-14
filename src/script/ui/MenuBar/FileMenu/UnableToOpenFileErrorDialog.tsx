import { useContext } from "react";
import { Button, Container, Modal, Row } from "react-bootstrap";
import { AppState } from "../../../App";

export const UnableToOpenFileErrorDialog = ({ errMessage }: { errMessage?: string; }) => {

  const appState = useContext(AppState)

  return (
    <Modal show={true}>
      <Modal.Header>
        <Modal.Title>Error Opening File</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Row>Unable to open file.</Row>
          {errMessage && <Row>{errMessage}</Row>}
          <Row>
            <Button
              onClick={() => appState.setCurrentDialog(<></>)}
            >Ok</Button>
          </Row>
        </Container>
      </Modal.Body>
    </Modal>
  )
};
