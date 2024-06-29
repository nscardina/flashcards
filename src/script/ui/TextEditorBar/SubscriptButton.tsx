import MaterialSymbol from "../MaterialSymbol";
import { useContext } from "react";
import { AppState } from "../../App";
import NonUserSelectableButton from "./NonUserSelectableButton";
import { Editor } from "slate";

export default function SubscriptButton() {

    const textEditor = useContext(AppState).textEditor

    return (
        <NonUserSelectableButton className="flashcard-button" onClick={event => {
            event.preventDefault()
            const marks = Editor.marks(textEditor)

            if (marks !== null) {
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