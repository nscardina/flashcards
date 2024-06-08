import MaterialSymbol from "../MaterialSymbol";
import NonUserSelectableButton from "./NonUserSelectableButton";
import { Editor } from "slate";
import { useContext } from "react";
import { AppState } from "../../App";

export default function ItalicButton() {

    const appState = useContext(AppState)

    return (
        <NonUserSelectableButton className="flashcard-button" onClick={event => {
            event.preventDefault()

            const marks = Editor.marks(appState.textEditor)

            if (marks !== null) {
                if (marks.italic) {
                    Editor.removeMark(appState.textEditor, 'italic')
                } else {
                    Editor.addMark(appState.textEditor, 'italic', true)
                }
            }   
        }}>
            <MaterialSymbol>format_italic</MaterialSymbol>
        </NonUserSelectableButton>
    )
}