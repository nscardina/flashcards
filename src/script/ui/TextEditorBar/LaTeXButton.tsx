import { useContext } from "react";
import Latex from "react-latex-next";
import { AppState } from "../../App";
import NonUserSelectableButton from "./NonUserSelectableButton";
import { Path } from "slate";
import { LaTeXTextSpan } from "../types/block/LaTeXTextSpan";

export default function LaTeXButton() {

    const appState = useContext(AppState);

    return (
        <NonUserSelectableButton className="flashcard-button" onClick={event => {
            const currentEditor = appState.textEditors[
                appState.lastEditedTextEditorIndex
            ]

            // Parent of currently selected element in the document.
            const parentElem = currentEditor.above()

            // If there is no parent element, don't do anything.
            if (parentElem !== undefined) {
                const node: LaTeXTextSpan = {
                    type: "latex_text_span",
                    children: [
                        {
                            type: "latex_text",
                            text: "test"
                        }
                    ]
                }

                const path = Path.next(parentElem[1])
                // appState.setLastEditedNodePath(path);

                // Transforms.insertNodes(currentEditor, node, {
                //     at: path // path of parentElem
                // });
                // Transforms.select(currentEditor, path);
                console.log(currentEditor.selection)
                
                // Transforms.select(currentEditor, [
                //     ...parentElem[1].slice(0, -1), 
                //     parentElem[1].at(-1)! + 1
                // ]);
            }

            appState.setShouldLaTeXEditorReplace(false);
            appState.setShowLaTeXEditor(true);
            
            event.preventDefault();
        }}>
            <Latex>
                $\LaTeX$
            </Latex>
        </NonUserSelectableButton>

    )
}