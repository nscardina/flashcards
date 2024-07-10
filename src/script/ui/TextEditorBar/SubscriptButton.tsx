import MaterialSymbol from "../MaterialSymbol";
import { useContext } from "react";
import { AppState } from "../../App";
import NonUserSelectableButton from "./NonUserSelectableButton";
import { Editor } from "slate";
import { isFormattedTextMarks } from "../types/leaf/FormattedText";

export default function SubscriptButton() {

    const appState = useContext(AppState)

    const textEditor = appState.textEditors[
        appState.lastEditedTextEditorIndex
    ]

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
        }}>
            <MaterialSymbol>subscript</MaterialSymbol>
        </NonUserSelectableButton>
    )
}