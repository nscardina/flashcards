import { useContext, useState } from "react";
import { AppState } from "../App";
import { Button, Modal, Row } from "react-bootstrap";
import Latex from "react-latex-next";
import { createEditor, Element, isBlock, Node, Path, Transforms } from "slate";
import { Editable, Slate, withReact } from "slate-react";
import { withHistory } from "slate-history";
import { ParagraphElement } from "./types/block/ParagraphElement";
import { Deck } from "../card/deck";
import { Side } from "../card/side";
import { BoxNumber } from "../card/Box";
import { CardContentData } from "../card/CardContentData";
import { LaTeXText } from "./types/leaf/LaTeXText";
import deepEqual from "deep-equal";
import { LaTeXTextSpan } from "./types/block/LaTeXTextSpan";
import GeneratorToArray from "../misc/GeneratorToArray";
import { CustomElement } from "./types/slate_defs";

export default function LaTeXEditor() {
    const appState = useContext(AppState);

    const [editor] = useState(() => withReact(withHistory(createEditor())));

    return (
        <Modal show={true}>
            <Modal.Header>
                <Modal.Title><Latex>$\LaTeX$</Latex> Editor</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    {/* <FCEditor 
                        editorIndex={App.LATEX_EDITOR_INDEX}
                        initialValue={[ParagraphElement.makeDefault()]}
                    /> */}
                    <Slate editor={editor} initialValue={[
                        ParagraphElement.makeDefault()
                    ]}>
                        <Editable id="latex-editor-editable" />
                    </Slate>
                </Row>
                <Row>
                    <Button onClick={() => {
                        try {
                            const editor = appState.textEditors[
                                appState.lastEditedTextEditorIndex
                            ]
    
                            const node: LaTeXTextSpan = {
                                type: "latex_text_span",
                                isInline: true,
                                children: [
                                    {
                                        type: "latex_text",
                                        text: document.getElementById("latex-editor-editable")?.textContent ?? "asdgasgasg"
                                    }
                                ]
                            }
    
                            console.log(editor.selection)
                            const selection = editor.selection
                            console.log(editor.children)
                            
                            if (selection !== null) {
                                const path = selection.anchor.path

                                const latexTextSpanAncestor = GeneratorToArray(
                                    Node.ancestors(editor, path, { reverse: true })
                                )
                                .find(ancestor => LaTeXTextSpan.isLaTeXTextSpan(ancestor))

                                if (latexTextSpanAncestor === undefined) {
                                    // There is no LaTeXTextSpan ancestor, so a new LaTeXTextSpan
                                    // needs to be inserted at the closest ancestor that is not an 
                                    // inline element.
                                    const insertionAncestor = GeneratorToArray(
                                        Node.ancestors(editor, path, { reverse: true })
                                    )
                                    
                                    // .find(ancestor => CustomElement.isCustomElement(ancestor))
                                    .find(ancestor => {
                                        console.log(ancestor)
                                        console.log(CustomElement.isCustomElement(ancestor))
                                        return true
                                    })
                                    // .find(ancestor => Element.isElement(ancestor) && !editor.isInline(ancestor))
                                    if (insertionAncestor !== undefined) {
                                        console.log(insertionAncestor)
                                        Transforms.insertNodes(editor, node, 
                                            {
                                                at: insertionAncestor[1]
                                            }
                                        );
                                    } else {
                                        console.error("No block node ancestor found to insert LaTeXTextSpan")
                                    }
                                    
                                }

                                // if (
                                //     editor.hasPath(Path.parent(path)) &&
                                //     LaTeXTextSpan.isLaTeXTextSpan(editor.node(Path.parent(path))[0])
                                // ) {
                                //     Transforms.insertNodes(editor, node, 
                                //         {
                                //             at: Path.parent(path)
                                //         }
                                //     );
                                // } else {
                                //     Transforms.insertNodes(editor, node, 
                                //         {
                                //             match: (_node, _path) => (
                                //                 GeneratorToArray(Node.ancestors(editor, path, { reverse: true }))
                                //                 .some(ancestor => ancestor[1] === _path)
                                //             )
                                //         }
                                //     );
                                // }
                                
                                
                               
                                console.log(editor.children)
    
                                if (appState.shouldLaTeXEditorReplace) {
                                    Transforms.delete(editor, {
                                        at: Path.next(selection.anchor.path)
                                    });
                                }
                                
                            }
                            
                        } finally {
                            appState.setShowLaTeXEditor(false);
                        }
                       

                        // console.log(`lenp` + appState.lastEditedNodePath)

                        // const face = (appState.lastEditedTextEditorIndex / 4 === 0) ? Side.FRONT : Side.BACK
                        // const box = String(appState.lastEditedTextEditorIndex % 4 === 0 ? 1 : appState.lastEditedTextEditorIndex % 4) as BoxNumber

                       

                        // // Fixes problem where sometimes the LaTeXTextSpan will be selected 
                        // // and sometimes the LaTeXText will be selected; accounts for this so
                        // // path variable always contains the path to the LaTeXText element.
                        // let path = [...appState.lastEditedNodePath];
                        // try {
                        //     if (LaTeXTextSpan.isLaTeXTextSpan(editor.node(path)[0])) {
                        //         path = appState.lastEditedNodePath
                        //     } else {
                        //         if (LaTeXTextSpan.isLaTeXTextSpan(editor.node(Path.parent(path))[0])) {
                        //             path = Path.parent(path)
                        //         } else if (LaTeXTextSpan.isLaTeXTextSpan(editor.node([...path, 0])[0])) {
                        //             path = [...path, 0]
                        //         }

                        //         // path = [...path, 0]
                        //         // if (LaTeXText.isLaTeXText(editor.node(path)[0])) {
                        //         //     path = path
                        //         // } else {
                        //         //     path = [...path, 0]
                        //         // }
                        //     }
                        // }
                        // catch (e) { }

                        // console.log((editor.node(path)))

                        // console.log("=================")
                        // console.log(document.getElementById("latex-editor-editable")?.textContent ?? "asdgasgasg")
                        // console.log(editor.node(path))

                        // const originalChildren = structuredClone(editor.children)
                        // console.log(originalChildren)

                        // console.log(path)
             
                        // Transforms.removeNodes(
                        //     editor,
                        //     {
                        //         at: Path.parent(path)
                        //     }
                        // )
                        // Transforms.insertNodes(
                        //     editor,
                        //     {
                        //         type: "latex_text_span",
                        //         isInline: true,
                        //         children: [
                        //             {
                        //                 type: "latex_text",
                        //         // tstetst: "dsfjklasdjgfkladsj",
                        //         text: document.getElementById("latex-editor-editable")?.textContent ?? "asdgasgasg"
                            
                        //             }
                        //         ]
                        //         },
                        //     {
                        //         at: Path.next(path),

                        //         // match: (node, _path) => true
                        //     }
                        // );
                        // if (editor.hasPath(Path.previous(path))) {
                            // Transforms.removeNodes(
                            //     editor,
                            //     {
                            //         at: path,
                            //         voids: true
                            //     }
                            // )
                        // }


                        // console.log(Object)

                        // console.log(editor.node([
                        //     ...path
                        // ]))

                        // console.log(appState.deck)

                        // console.log(deepEqual(originalChildren, editor.children))

                        // const deck = Deck.setBoxOnCardFace(
                        //     appState.deck!,
                        //     appState.visibleCardIndex,
                        //     face,
                        //     box,
                        //     {
                        //         ...appState.deck!.cards[appState.visibleCardIndex][face].box[box]!,
                        //         type: CardContentData.Type.TEXT,
                        //         textNodes: appState.textEditors[
                        //             appState.lastEditedTextEditorIndex
                        //         ].children
                        //     }
                        // )

                        // // console.log(appState.deck)

                        // // appState.setDeck(deck);



                        // appState.setShowLaTeXEditor(false);
                    }}>
                        Done
                    </Button>
                </Row>
            </Modal.Body>
        </Modal>
    );
}