import MaterialSymbol from "../MaterialSymbol";
import NonUserSelectableButton from "./NonUserSelectableButton";
import { Editor } from "slate";
import { isFormattedTextMarks } from "../types/leaf/FormattedText";
import { useFCState } from "../../state/FCState";
import { useShallow } from "zustand/react/shallow";
import { useContext } from "react";
import { getEditorByIndex, ReactEditorContext } from "../../App";

export default function SuperscriptButton() {

    const state = useContext(ReactEditorContext);
    const textEditor = getEditorByIndex(state, state.lastEditedTextEditorIndex);
    // const textEditor = useFCState(state => state.currentEditor)();
    const deck = useFCState(useShallow(state => state.deck));

    return (
        <NonUserSelectableButton disabled={deck === null} className="flashcard-button" onClick={event => {
            event.preventDefault()

            if (textEditor !== null) {
                const marks = Editor.marks(textEditor)

                if (marks !== null && isFormattedTextMarks(marks)) {
                    Editor.removeMark(textEditor, "subscript")
                    if (marks.superscript) {
                        Editor.removeMark(textEditor, 'superscript')
                    } else {
                        Editor.addMark(textEditor, 'superscript', true)
                    }
                }
            }
        }}
            style={{ color: (deck === null) ? "var(--bs-secondary)" : "inherit" }}
        >
            <MaterialSymbol>superscript</MaterialSymbol>
        </NonUserSelectableButton>
    )
}