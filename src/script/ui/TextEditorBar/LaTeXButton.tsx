import Latex from "react-latex-next";
import NonUserSelectableButton from "./NonUserSelectableButton";
import { useFCState } from "../../state/FCState";

export default function LaTeXButton() {

    const currentEditor = useFCState(state => state.currentEditor)();
    const setShouldLaTeXEditorReplace = useFCState(state => state.setShouldLaTeXEditorReplace);
    const setShowLaTeXEditor = useFCState(state => state.setShowLaTeXEditor);

    return (
        <NonUserSelectableButton className="flashcard-button" onClick={event => {
            // Parent of currently selected element in the document.
            const parentElem = currentEditor.above()

            // If there is no parent element, don't do anything.
            if (parentElem !== undefined) {
                // const node: LaTeXTextSpan = {
                //     type: "latex_text_span",
                //     children: [
                //         {
                //             type: "latex_text",
                //             text: "test"
                //         }
                //     ]
                // }

                // const path = Path.next(parentElem[1])
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

            setShouldLaTeXEditorReplace(false);
            setShowLaTeXEditor(true);
            
            event.preventDefault();
        }}>
            <Latex>
                $\LaTeX$
            </Latex>
        </NonUserSelectableButton>

    )
}