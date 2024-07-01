import MaterialSymbol from "../MaterialSymbol";
import { useContext } from "react";
import { AppState } from "../../App";
import NonUserSelectableButton from "./NonUserSelectableButton";
import { Editor } from "slate";

export default function SuperscriptButton() {

    const appState = useContext(AppState)

    const textEditor = appState.textEditors[
        appState.lastEditedTextEditorIndex
    ]

    return (
        <NonUserSelectableButton className="flashcard-button" onClick={event => {
            event.preventDefault()
            const marks = Editor.marks(textEditor)

            if (marks !== null) {
                Editor.removeMark(textEditor, "subscript")
                if (marks.superscript) {
                    Editor.removeMark(textEditor, 'superscript')
                } else {
                    Editor.addMark(textEditor, 'superscript', true)
                }
            }   
        }}>
            <MaterialSymbol>superscript</MaterialSymbol>
        </NonUserSelectableButton>
    )
}