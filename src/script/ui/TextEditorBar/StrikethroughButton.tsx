import { useContext } from "react";
import MaterialSymbol from "../MaterialSymbol";
import NonUserSelectableButton from "./NonUserSelectableButton";
import { AppState } from "../../App";
import { Editor } from "slate";

export default function StrikethroughButton() {

    const textEditor = useContext(AppState).textEditor

    return (
        <NonUserSelectableButton className="flashcard-button" onClick={event => {
            event.preventDefault()
            
            const marks = Editor.marks(textEditor)

            if (marks !== null) {
                if (marks.strikethrough) {
                    Editor.removeMark(textEditor, 'strikethrough')
                } else {
                    Editor.addMark(textEditor, 'strikethrough', true)
                }
            }  
        }}>
            <MaterialSymbol>format_strikethrough</MaterialSymbol>
        </NonUserSelectableButton>
    )
}