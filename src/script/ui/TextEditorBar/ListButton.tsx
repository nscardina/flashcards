import { Dropdown } from "react-bootstrap";
import MaterialSymbol from "../MaterialSymbol";
import { Editor, Element, Node, Path, Transforms } from "slate";
import { useContext } from "react";
import { AppState } from "../../App";

export default function ListButton() {

    const textEditor = useContext(AppState).textEditor

    return (
        <Dropdown>
            <Dropdown.Toggle className="flashcard-button d-flex flex-row" style={{ alignItems: "center" }}>
                <MaterialSymbol>format_list_bulleted</MaterialSymbol>
            </Dropdown.Toggle>
            <Dropdown.Menu>
                <Dropdown.Item className="d-flex flex-row" onClick={event => {
                    event.preventDefault()

                    if (!textEditor.selection) {
                        return
                    }

                    const selectedRange = Editor.unhangRange(textEditor, textEditor.selection, { voids: true })
                    let [_, textElemPath] = Node.common(
                        textEditor, selectedRange.anchor.path, 
                        selectedRange.focus.path)

                    const pParentPath = Path.parent(textElemPath)

                    if (Path.ancestors(pParentPath).length > 2) {
                        let potentialLIPath = Path.parent(pParentPath)
                        let potentialListElemPath = Path.parent(potentialLIPath)

                        const [potentialList] = Node.common(
                            textEditor,
                            potentialListElemPath,
                            potentialListElemPath
                        )
                        const potentialLIPathRef = Editor.pathRef(textEditor, potentialLIPath)

                        if (
                            (potentialList as Element).type === "ordered_list_element" ||
                            (potentialList as Element).type === "unordered_list_element"
                        ) {

                            Transforms.unwrapNodes(textEditor,
                                { at: potentialListElemPath })

                            Transforms.unwrapNodes(textEditor,
                                { at: potentialLIPathRef.current! })
                            

                                if (
                                    (potentialList as Element).type === "ordered_list_element"
                                ) {
                                    Transforms.wrapNodes(textEditor,
                                        { type: "unordered_list_element", alignment: "left", children: [] }
                                    )
                
                                    Transforms.wrapNodes(textEditor,
                                        { type: "unordered_list_member", children: { type: "paragraph", children: [], alignment: "left" } },
                                        {
                                            match: node => Element.isElement(node) &&
                                                Editor.isBlock(textEditor, node)
                                        })
                                }
        
                        }
                    } else {
                        Transforms.wrapNodes(textEditor,
                            { type: "unordered_list_element", alignment: "left", children: [] }
                        )
    
                        Transforms.wrapNodes(textEditor,
                            { type: "unordered_list_member", children: { type: "paragraph", children: [], alignment: "left" } },
                            {
                                match: node => Element.isElement(node) &&
                                    Editor.isBlock(textEditor, node)
                            })
                    }

                    
                }}>
                    <MaterialSymbol>format_list_bulleted</MaterialSymbol>&nbsp;&nbsp;Left
                </Dropdown.Item>
                <Dropdown.Item className="d-flex flex-row" onClick={event => {
                    event.preventDefault()

                    if (!textEditor.selection) {
                        return
                    }

                    const selectedRange = Editor.unhangRange(textEditor, textEditor.selection, { voids: true })
                    let [_, textElemPath] = Node.common(
                        textEditor, selectedRange.anchor.path, 
                        selectedRange.focus.path)

                    const pParentPath = Path.parent(textElemPath)

                    if (Path.ancestors(pParentPath).length > 2) {
                        let potentialLIPath = Path.parent(pParentPath)
                        let potentialListElemPath = Path.parent(potentialLIPath)

                        const [potentialList] = Node.common(
                            textEditor,
                            potentialListElemPath,
                            potentialListElemPath
                        )
                        const potentialLIPathRef = Editor.pathRef(textEditor, potentialLIPath)

                        if (
                            (potentialList as Element).type === "ordered_list_element" ||
                            (potentialList as Element).type === "unordered_list_element"
                        ) {

                            Transforms.unwrapNodes(textEditor,
                                { at: potentialListElemPath })

                            Transforms.unwrapNodes(textEditor,
                                { at: potentialLIPathRef.current! })

                            if ((potentialList as Element).type === "unordered_list_element") {
                                Transforms.wrapNodes(textEditor,
                                    { type: "ordered_list_element", alignment: "left", children: [] }
                                )
            
                                Transforms.wrapNodes(textEditor,
                                    { type: "ordered_list_member", children: { type: "paragraph", children: [], alignment: "left" } },
                                    {
                                        match: node => Element.isElement(node) &&
                                            Editor.isBlock(textEditor, node)
                                    })
                            }

                        }
                    } else {
                        Transforms.wrapNodes(textEditor,
                            { type: "ordered_list_element", alignment: "left", children: [] }
                        )
    
                        Transforms.wrapNodes(textEditor,
                            { type: "ordered_list_member", children: { type: "paragraph", children: [], alignment: "left" } },
                            {
                                match: node => Element.isElement(node) &&
                                    Editor.isBlock(textEditor, node)
                            })
                    }
                    
                }}>
                    <MaterialSymbol>format_list_numbered</MaterialSymbol>&nbsp;&nbsp;Center
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    )
}