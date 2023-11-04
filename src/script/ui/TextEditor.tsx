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

                const children = document.getElementById("inputBox")?.children
                if (!children) return;
                let text = "";
                for (let i = 0; i < children?.length - 1; i++) {
                  text += `${children.item(i)?.textContent}<br>`
                }
                if (children.length > 1) {
                  text += `${children.item(children.length - 1)?.textContent}`
                }


                //TODO fix Card face and Box
                editCard(appState, appState.visibleSide,
                  appState.boxBeingEdited!,
                  { text: text ?? "" },
                )

              }}
              disabled={
                (document.getElementById("inputBox") !== null ? 
                [...document.getElementById("inputBox")!.childNodes.entries()] : [])
                .filter(entry => entry[1].nodeType === Node.ELEMENT_NODE)
                .filter(entry => (entry[1] as Element).hasAttribute("data-slate-node"))
                .some(entry => (entry[1] as Element).textContent !== null ? 
                (entry[1] as Element).textContent!.match(/abcd/g) ?? 0 >= 0 : false)
                  
              



                // if (!children) return;
                // for (let i = 0; i < children?.length - 1; i++) {
                  
                // }
                // return false
              }
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