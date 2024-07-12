import { Dropdown } from "react-bootstrap";
import MaterialSymbol from "../MaterialSymbol";
import { Editor, Transforms } from "slate";
import React, { useContext } from "react";
import { AppState } from "../../App";
import { Element } from "slate";
import { HorizontalAlignment } from "../types/slate_defs";



export default function TextAlignmentButton() {

    const appState = useContext(AppState)
    const textEditor = appState.textEditors[
        appState.lastEditedTextEditorIndex
    ]

    function textAlignmentOnClickFactory(
        propertyName: HorizontalAlignment,
    ) {
    
        return (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
            event.preventDefault()
            Transforms.setNodes(textEditor, 
                {type: "paragraph", alignment: propertyName}, 
                {match: node => Element.isElement(node) && 
                    Editor.isBlock(textEditor, node)})
        }
    }   


    const leftAlignedFunction = textAlignmentOnClickFactory('left')
    const centerAlignedFunction = textAlignmentOnClickFactory('center')
    const rightAlignedFunction = textAlignmentOnClickFactory('right')
    const justifiedFunction = textAlignmentOnClickFactory('justified')

    return (
        <Dropdown className="fc-text-editor-bar-min-content">
            <Dropdown.Toggle className="flashcard-button d-flex flex-row" style={{alignItems: "center"}}> 
                <MaterialSymbol>format_align_left</MaterialSymbol>
            </Dropdown.Toggle>
            <Dropdown.Menu>
                <Dropdown.Header>Text Alignment</Dropdown.Header>
                <Dropdown.Item className="d-flex flex-row" onClick={leftAlignedFunction}>
                    <MaterialSymbol>format_align_left</MaterialSymbol>&nbsp;&nbsp;Left
                </Dropdown.Item>
                <Dropdown.Item className="d-flex flex-row" onClick={centerAlignedFunction}>
                    <MaterialSymbol>format_align_center</MaterialSymbol>&nbsp;&nbsp;Center
                </Dropdown.Item>
                <Dropdown.Item className="d-flex flex-row" onClick={rightAlignedFunction}>
                    <MaterialSymbol>format_align_right</MaterialSymbol>&nbsp;&nbsp;Right
                </Dropdown.Item>
                <Dropdown.Item className="d-flex flex-row" onClick={justifiedFunction}>
                    <MaterialSymbol>format_align_justify</MaterialSymbol>&nbsp;&nbsp;Justified
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    )
}