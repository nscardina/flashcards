import MaterialSymbol from "../MaterialSymbol";
import NonUserSelectableButton from "./NonUserSelectableButton";
import { Editor } from "slate";
import { isFormattedTextMarks } from "../types/leaf/FormattedText";
import { useFCState } from "../../state/FCState";
import { useShallow } from "zustand/react/shallow";

export default function SubscriptButton() {

    const textEditor = useFCState(state => state.currentEditor)();
    const deck = useFCState(useShallow(state => state.deck));

    return (
        <NonUserSelectableButton className="flashcard-button" onClick={event => {
            event.preventDefault()
            const marks = Editor.marks(textEditor)

            if (marks !== null && isFormattedTextMarks(marks)) {
                Editor.removeMark(textEditor, "superscript")
                if (marks.subscript) {
                    Editor.removeMark(textEditor, 'subscript')
                } else {
                    Editor.addMark(textEditor, 'subscript', true)
                }
            }   
        }}
        style={{color: (deck === null) ? "var(--bs-secondary)" : "inherit"}}
        >
            <MaterialSymbol>subscript</MaterialSymbol>
        </NonUserSelectableButton>
    )
}