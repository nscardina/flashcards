import { useContext, useState } from "react";
import { Button, Col, Container, Modal, Row } from "react-bootstrap";
import { createEditor } from 'slate'
import { Editable, Slate, withReact } from "slate-react";
import { Editor } from "../app/Editor";
import { AppState } from "../App";
import { changeEditor, editCard } from "../state/AppState";



export type TextEditorPayload = {
  text: string
}



function TextEditor() {
  const appState = useContext(AppState)

  if (!appState.boxBeingEdited) {
    throw new Error(
      "Error: Text editor opened while box being edited not set"
    )
  }

  const [editor] = useState(() => withReact(createEditor()))

  return (
    <Modal show={true}>
      <Modal.Header>
        <Modal.Title>Text Editor</Modal.Title>
      </Modal.Header>
      <Modal.Body >
        <Container>
          <Row>
            <Slate editor={editor} initialValue={[{
              type: 'paragraph',
              children: [{ text: '' }]
            }]}>
              <Editable id="inputBox" style={{ maxHeight: '80vh', overflowY: 'auto' }} placeholder="Enter text here..."
                renderPlaceholder={({ children, attributes }) => (
                  <div {...attributes}>
                    {children}
                  </div>
                )} />
            </Slate>
          </Row>
          <Row>
            <Col className="d-flex justify-content-end">
            <Button className="ms-auto mt-3" onClick={
              () => changeEditor(
                appState, Editor.NONE, 1)}
              >
                Cancel
              </Button>
              <Button className="ms-3 mt-3" onClick={() => {

                editCard(appState, appState.visibleSide,
                  appState.boxBeingEdited!,
                  { text: document.getElementById("inputBox")?.innerHTML ?? "" ?? "" },
                )
              }}
              >
                Submit
              </Button>
              
            </Col>
          </Row>
        </Container>
      </Modal.Body>
    </Modal>
  )
}

export default TextEditor