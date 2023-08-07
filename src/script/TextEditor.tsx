import { useRef, useState } from "react";
import { Button, Col, Container, Modal, Row } from "react-bootstrap";
import { Operation, createEditor } from 'slate'
import { Editable, Slate, withReact } from "slate-react";
import { BaseEditor, Descendant } from 'slate'
import { ReactEditor } from 'slate-react'
import { PayloadAction } from "@reduxjs/toolkit";
import { Boxes, Side } from "./card/side";
import { editCard } from "./card_deck";
import { useDispatch } from "react-redux";

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
    face: Side,
    box: Boxes,
    text: string
}
export type TextEditorPayloadAction = PayloadAction<TextEditorPayload, 'deck/editCard'>





function TextEditor({ show, currentCardIndex, currentSide, currentBox, setTextEditorVisibleFunc }: {
    show: boolean,
    currentCardIndex: number,
    currentSide: Side,
    currentBox: Boxes,
    setTextEditorVisibleFunc: React.Dispatch<React.SetStateAction<boolean>>
}) {
    const dispatch = useDispatch()
    
    const [inputText, setInputText] = useState<string>("")

    const [editor] = useState(() => withReact(createEditor()))

    return (
        <Modal show={show} >
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
                            <Editable id="inputBox" style={{maxHeight: '80vh', overflowY: 'auto'}} placeholder="Enter text here..." 
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
                                dispatch(editCard(currentSide, currentBox, document.getElementById("inputBox")?.innerText ?? ""))
                                setTextEditorVisibleFunc(false)
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