import { useContext, useState } from "react";
import { Button, Col, Container, Modal, Row } from "react-bootstrap";
import { createEditor } from 'slate'
import { Editable, Slate, withReact } from "slate-react";
import { Editor } from "../app/Editor";
import { changeEditor } from "../state/AppState";
import { AppState } from "../App";



export type DeckEditorPayload = {

  text: string
}





function DeckNameEditor() {
  const appState = useContext(AppState)

  const [editor] = useState(() => withReact(createEditor()))

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
            <Button className="ms-auto mt-3" onClick={() => changeEditor(
                appState, Editor.NONE, "1")
              }
              >
                Cancel
              </Button>
              <Button className="ms-3 mt-3" onClick={() => {

                //TODO fix Card face and Box
                if (!!appState.deck) {
                  appState.setDeck({
                    ...appState.deck,
                    name: document.getElementById("deckNameEditorBox")?.innerText ?? "",
                  })
                  
                  appState.setVisibleEditor(Editor.NONE)
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