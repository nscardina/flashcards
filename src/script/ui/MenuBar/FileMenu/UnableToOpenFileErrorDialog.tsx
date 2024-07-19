import { Button, Container, Modal, Row } from "react-bootstrap";
import { useFCState } from "../../../state/FCState";

export const UnableToOpenFileErrorDialog = ({ errMessage }: { errMessage?: string; }) => {

  const setCurrentDialog = useFCState(state => state.setCurrentDialog);

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
              onClick={() => setCurrentDialog(<></>)}
            >Ok</Button>
          </Row>
        </Container>
      </Modal.Body>
    </Modal>
  )
};
