import { useState } from "react";
import { Button, Col, Container, Modal, Row } from "react-bootstrap";
import { createEditor } from 'slate'
import { Editable, Slate, withReact } from "slate-react";
import { PayloadAction } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { Boxes } from "../card/box";
import { Editor } from "../app/Editor";
import { changeEditor, renameDeck } from "../state/deck_actions";



export type DeckEditorPayload = {

  text: string
}
export type DeckEditorPayloadAction = PayloadAction<DeckEditorPayload, 'deck/editCard'>





function DeckNameEditor() {
  const dispatch = useDispatch()

  const [inputText, setInputText] = useState<string>("")

  const [editor] = useState(() => withReact(createEditor()))

  return (
    <Modal show={true}>
      <Modal.Header>
        <Modal.Title>Choose Deck Name</Modal.Title>
      </Modal.Header>
      <Modal.Body >
        <Container>
          <Row>
            <Slate editor={editor} initialValue={[{
              type: 'paragraph',
              children: [{ text: '' }]
            }]}>
              <Editable id="deckNameEditorBox" style={{ maxHeight: '80vh', overflowY: 'auto' }} placeholder="Enter text here..."
                renderPlaceholder={({ children, attributes }) => (
                  <div {...attributes}>
                    {children}
                  </div>
                )} />
            </Slate>
          </Row>
          <Row>
            <Col className="d-flex justify-content-end">
            <Button className="ms-auto mt-3" onClick={() => dispatch(changeEditor(
                Editor.NONE, Boxes.BOX_1))}
              >
                Cancel
              </Button>
              <Button className="ms-3 mt-3" onClick={() => {

                //TODO fix Card face and Box
                dispatch(renameDeck(
                  document.getElementById("deckNameEditorBox")?.innerText ?? ""
                ))

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