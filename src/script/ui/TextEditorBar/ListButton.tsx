import { Dropdown } from "react-bootstrap";
import MaterialSymbol from "../MaterialSymbol";
import { Editor, Element, Node, Path, Transforms } from "slate";
import { KeyboardEvent, useContext } from "react";
import { AppState } from "../../App";
import { Range } from "slate";
import { UnorderedListElement, UnorderedListMember } from "../types/UnorderedListElement";
import { CustomText } from "../types/slate_defs";
import { ParagraphElement } from "../types/ParagraphElement";
import { OrderedListElement, OrderedListMember } from "../types/OrderedListElement";

export function listEnterKeyEventHandler(
    event: KeyboardEvent,
    editor: Editor
) {
    unorderedListEnterKeyEventHandler(event, editor);
    orderedListEnterKeyEventHandler(event, editor);
}

function unorderedListEnterKeyEventHandler(
    event: KeyboardEvent,
    editor: Editor,

) {
    outermost_if: if (
        editor.selection !== null
        && Range.isCollapsed(editor.selection)
    ) {
        const pathToSelectedElement = editor.selection.anchor.path

        if (!CustomText.isCustomText(editor.node(pathToSelectedElement)[0])) {
            break outermost_if;
        }

        const [
            customTextElem,
            customTextElemPath
        ] = editor.node(pathToSelectedElement) as [CustomText, Path]

        if (
            customTextElemPath.length < 4
            || !ParagraphElement.isParagraphElement(editor.node(Path.parent(customTextElemPath))[0])
        ) {
            // Custom text element has no paragraph element parent
            break outermost_if;
        }

        const [
            _,
            paragraphElementPath
        ] = editor.node(Path.parent(customTextElemPath)) as [ParagraphElement, Path]

        const [
            unorderedListMemberElement,
            unorderedListMemberElementPath
        ] = editor.node(Path.parent(paragraphElementPath)) as [UnorderedListMember, Path]

        const [
            unorderedListElement,
            unorderedListElementPath
        ] = editor.node(Path.parent(unorderedListMemberElementPath)) as [UnorderedListElement, Path]

        if (!UnorderedListMember.isUnorderedListMember(unorderedListMemberElement)) {
            // Paragraph element has no ordered list member parent
            break outermost_if;
        }

        if (!UnorderedListElement.isUnorderedListElement(unorderedListElement)) {
            // Paragraph element has no ordered list parent
            console.log("no unordered list parent");
            break outermost_if;
        }

        if (!event.shiftKey) {
            if (
                event.key === "Enter"
                && customTextElem.text.length > 0
            ) {
                const newNode: UnorderedListMember = {
                    type: "unordered_list_member",
                    children: [
                        {
                            "type": "paragraph",
                            "children": [
                                {
                                    "text": ""
                                }
                            ],
                            "alignment": "left"
                        }
                    ],
                }

                Transforms.insertNodes(
                    editor,
                    newNode,
                    {
                        at: [...unorderedListMemberElementPath.slice(0, -1), unorderedListMemberElementPath.at(-1)! + 1]
                    }
                )
                Transforms.select(editor, 
                    [...unorderedListMemberElementPath.slice(0, -1), unorderedListMemberElementPath.at(-1)! + 1]
                )
                event.preventDefault();
                event.stopPropagation();
            }
            else if (
                (
                    event.key === "Enter"
                    && customTextElem.text.length === 0
                ) || (
                    event.key === "Backspace"
                    && customTextElem.text.length === 0
                )
            ) {
                Transforms.delete(editor, {
                    at: unorderedListMemberElementPath
                })
                // insert new paragraph element below the list
                const newParagraphElement: ParagraphElement = {
                    type: "paragraph",
                    children: [
                        {
                            text: ""
                        }
                    ],
                    alignment: "left"
                }
                if (unorderedListElement.children.length > 1) {
                    Transforms.insertNodes(
                        editor, newParagraphElement,
                        {
                            at: [
                                ...unorderedListElementPath.slice(0, -1),
                                unorderedListElementPath.at(-1)! + 1
                            ]
                        }
                    )
                    Transforms.select(editor, [
                        ...unorderedListElementPath.slice(0, -1),
                        unorderedListElementPath.at(-1)! + 1
                    ])
                } else {
                    Transforms.delete(editor, {
                        at: unorderedListElementPath
                    })
                    if (unorderedListElementPath.length > 1) {
                        Transforms.select(editor, [
                            ...unorderedListElementPath.slice(0, -1)
                        ])
                    } else {
                        Transforms.insertNodes(
                            editor, structuredClone(newParagraphElement),
                            {
                                at: [0]
                            }
                        )
                        Transforms.select(editor, [0])
                    }
                }
                
                event.preventDefault();
                event.stopPropagation();
            }
        }
    }
}

function orderedListEnterKeyEventHandler(
    event: KeyboardEvent,
    editor: Editor,

) {
    outermost_if: if (
        editor.selection !== null
        && Range.isCollapsed(editor.selection)
    ) {
        const pathToSelectedElement = editor.selection.anchor.path

        if (!CustomText.isCustomText(editor.node(pathToSelectedElement)[0])) {
            break outermost_if;
        }

        const [
            customTextElem,
            customTextElemPath
        ] = editor.node(pathToSelectedElement) as [CustomText, Path]

        if (
            customTextElemPath.length < 4
            || !ParagraphElement.isParagraphElement(editor.node(Path.parent(customTextElemPath))[0])
        ) {
            // Custom text element has no paragraph element parent
            break outermost_if;
        }

        const [
            _,
            paragraphElementPath
        ] = editor.node(Path.parent(customTextElemPath)) as [ParagraphElement, Path]

        const [
            orderedListMemberElement,
            orderedListMemberElementPath
        ] = editor.node(Path.parent(paragraphElementPath)) as [OrderedListMember, Path]

        const [
            orderedListElement,
            orderedListElementPath
        ] = editor.node(Path.parent(orderedListMemberElementPath)) as [OrderedListElement, Path]

        if (!OrderedListMember.isOrderedListMember(orderedListMemberElement)) {
            // Paragraph element has no ordered list member parent
            break outermost_if;
        }

        if (!OrderedListElement.isOrderedListElement(orderedListElement)) {
            // Paragraph element has no ordered list parent
            break outermost_if;
        }

        if (!event.shiftKey) {
            if (
                event.key === "Enter"
                && customTextElem.text.length > 0
            ) {
                const newNode: OrderedListMember = {
                    type: "ordered_list_member",
                    children: [
                        {
                            "type": "paragraph",
                            "children": [
                                {
                                    "text": ""
                                }
                            ],
                            "alignment": "left"
                        }
                    ],
                }

                Transforms.insertNodes(
                    editor,
                    newNode,
                    {
                        at: [...orderedListMemberElementPath.slice(0, -1), orderedListMemberElementPath.at(-1)! + 1]
                    }
                )
                Transforms.select(editor, 
                    [...orderedListMemberElementPath.slice(0, -1), orderedListMemberElementPath.at(-1)! + 1]
                )
                event.preventDefault();
                event.stopPropagation();
            }
            else if (
                (
                    event.key === "Enter"
                    && customTextElem.text.length === 0
                ) || (
                    event.key === "Backspace"
                    && customTextElem.text.length === 0
                )
            ) {
                Transforms.delete(editor, {
                    at: orderedListMemberElementPath
                })
                // insert new paragraph element below the list
                const newParagraphElement: ParagraphElement = {
                    type: "paragraph",
                    children: [
                        {
                            text: ""
                        }
                    ],
                    alignment: "left"
                }
                if (orderedListElement.children.length > 1) {
                    Transforms.insertNodes(
                        editor, newParagraphElement,
                        {
                            at: [
                                ...orderedListElementPath.slice(0, -1),
                                orderedListElementPath.at(-1)! + 1
                            ]
                        }
                    )
                    Transforms.select(editor, [
                        ...orderedListElementPath.slice(0, -1),
                        orderedListElementPath.at(-1)! + 1
                    ])
                } else {
                    Transforms.delete(editor, {
                        at: orderedListElementPath
                    })
                    if (orderedListElementPath.length > 1) {
                        Transforms.select(editor, [
                            ...orderedListElementPath.slice(0, -1)
                        ])
                    } else {
                        Transforms.insertNodes(
                            editor, structuredClone(newParagraphElement),
                            {
                                at: [0]
                            }
                        )
                        Transforms.select(editor, [0])
                    }
                }
                
                event.preventDefault();
                event.stopPropagation();
            }
        }
    }
}



export default function ListButton() {

    const appState = useContext(AppState)
    const textEditor = appState.textEditors[appState.lastEditedTextEditorIndex]

    return (
        <Dropdown className="fc-text-editor-bar-min-content">
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
                                    { type: "unordered_list_member", children: [{ type: "paragraph", children: [], alignment: "left" }] },
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
                            { type: "unordered_list_member", children: [{ type: "paragraph", children: [], alignment: "left" }] },
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
                                    { type: "ordered_list_member", children: [{ type: "paragraph", children: [], alignment: "left" }] },
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
                            { type: "ordered_list_member", children: [{ type: "paragraph", children: [], alignment: "left" }] },
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