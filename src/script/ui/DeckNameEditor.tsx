import { Button, Col, Container, Modal, Row } from "react-bootstrap";
import { useFCState } from "../state/FCState";
import { useShallow } from "zustand/react/shallow";

export type DeckEditorPayload = {

  text: string
}

function DeckNameEditor() {

  const deck = useFCState(useShallow(state => state.deck));
  const setDeckName = useFCState(state => state.setDeckName);

  return (
    <Modal show={true}>
      <Modal.Header>
        <Modal.Title>Choose Deck Name</Modal.Title>
      </Modal.Header>
      <Modal.Body >
        <Container>
          <Row>
            {/* <Slate editor={editor} initialValue={[{
              type: 'paragraph',
              children: [{ text: '' }]
            }]}>
              <Editable id="deckNameEditorBox" style={{ maxHeight: '80vh', overflowY: 'auto' }} placeholder="Enter text here..."
                renderPlaceholder={({ children, attributes }) => (
                  <div {...attributes}>
                    {children}
                  </div>
                )} />
            </Slate> */}
          </Row>
          <Row>
            <Col className="d-flex justify-content-end">
            <Button className="ms-auto mt-3"
              >
                Cancel
              </Button>
              <Button className="ms-3 mt-3" onClick={() => {

                //TODO fix Card face and Box
                if (!!deck) {
                  setDeckName(document.getElementById("deckNameEditorBox")?.innerText ?? "")
                }

              }}>
                Submit
              </Button>
              
            </Col>
          </Row>
        </Container>




      </Modal.Body>

    </Modal>
  )
}

export default DeckNameEditor