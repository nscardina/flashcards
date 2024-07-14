import MaterialSymbol from "../MaterialSymbol";
import { useContext } from "react";
import { AppState } from "../../App";
import NonUserSelectableButton from "./NonUserSelectableButton";
import { Editor } from "slate";
import { isFormattedTextMarks } from "../types/leaf/FormattedText";

export default function SuperscriptButton() {

    const appState = useContext(AppState)

    const textEditor = appState.textEditors[
        appState.lastEditedTextEditorIndex
    ]

    return (
        <NonUserSelectableButton disabled={appState.deck === null} className="flashcard-button" onClick={event => {
            event.preventDefault()
            const marks = Editor.marks(textEditor)

            if (marks !== null && isFormattedTextMarks(marks)) {
                Editor.removeMark(textEditor, "subscript")
                if (marks.superscript) {
                    Editor.removeMark(textEditor, 'superscript')
                } else {
                    Editor.addMark(textEditor, 'superscript', true)
                }
            }   
        }}
        style={{color: (appState.deck === null) ? "var(--bs-secondary)" : "inherit"}}
        >
            <MaterialSymbol>superscript</MaterialSymbol>
        </NonUserSelectableButton>
    )
}