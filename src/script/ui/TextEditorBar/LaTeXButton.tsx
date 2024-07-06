import { useContext } from "react";
import Latex from "react-latex-next";
import { AppState } from "../../App";
import NonUserSelectableButton from "./NonUserSelectableButton";
import { Transforms } from "slate";
import { FormattedTextSpan } from "../types/block/FormattedTextSpan";
import { LaTeXTextSpan } from "../types/block/LaTeXTextSpan";

export default function LaTeXButton() {

    const appState = useContext(AppState);

    return (
        <NonUserSelectableButton className="flashcard-button" onClick={event => {
            const currentEditor = appState.textEditors[
                appState.lastEditedTextEditorIndex
            ]

            const parentElem = currentEditor.above()
            if (parentElem !== undefined) {
                const node: LaTeXTextSpan = {
                    type: "latex_text_span",
                    isInline: true,
                    children: [
                        {
                            type: "latex_text",
                            text: "test"
                        }
                    ]
                }
                Transforms.insertNodes(currentEditor, node, {
                    at: [
                        ...parentElem[1].slice(0, -1), 
                        parentElem[1].at(-1)! + 1
                    ] // path of parentElem
                })
                Transforms.select(currentEditor, [
                    ...parentElem[1].slice(0, -1), 
                    parentElem[1].at(-1)! + 1
                ])
            }

            // // Remove all marks
            // for (const mark in currentEditor.getMarks()) {
            //     currentEditor.removeMark(mark)
            // }

            // currentEditor.addMark("type", "latex_text")
            
            event.preventDefault();
        }}>
            <Latex>
                $\LaTeX$
            </Latex>
        </NonUserSelectableButton>

    )
}