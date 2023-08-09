import { useState } from "react";
import { Button, Col, Container, Modal, Row } from "react-bootstrap";
import { createEditor } from 'slate'
import { Editable, Slate, withReact } from "slate-react";
import { BaseEditor } from 'slate'
import { ReactEditor } from 'slate-react'
import { PayloadAction } from "@reduxjs/toolkit";
import { Side } from "./card/side";
import { useDispatch, useSelector } from "react-redux";
import { Boxes } from "./card/box";
import { editCard, selectBoxBeingEdited, selectVisibleSide } from "./state/Store";

type CustomElement = { type: 'paragraph'; children: CustomText[] }
type CustomText = { text: string }

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor
    Element: CustomElement
    Text: CustomText
  }
}

export type TextEditorPayload = {

  text: string
}
export type TextEditorPayloadAction = PayloadAction<TextEditorPayload, 'deck/editCard'>





function TextEditor() {
  const dispatch = useDispatch()

  const [inputText, setInputText] = useState<string>("")

  const visibleSide = useSelector(selectVisibleSide)
  const boxBeingEdited = useSelector(selectBoxBeingEdited)

  if (!boxBeingEdited) {
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
              <Button className="mt-3 ms-auto" onClick={() => {

                //TODO fix Card face and Box
                dispatch(editCard(visibleSide,
                  boxBeingEdited,
                  { text: document.getElementById("inputBox")?.innerText ?? "" },
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

export default TextEditor