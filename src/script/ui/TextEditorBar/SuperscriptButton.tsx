import MaterialSymbol from "../MaterialSymbol";
import { useContext } from "react";
import { AppState } from "../../App";
import NonUserSelectableButton from "./NonUserSelectableButton";
import { Editor } from "slate";

export default function SuperscriptButton() {

    const textEditor = useContext(AppState).textEditor

    return (
        <NonUserSelectableButton className="flashcard-button" onClick={event => {
            event.preventDefault()
            const marks = Editor.marks(textEditor)

            if (marks !== null) {
                //@ts-expect-error
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