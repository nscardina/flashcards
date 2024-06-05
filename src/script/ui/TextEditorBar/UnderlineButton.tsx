import MaterialSymbol from "../MaterialSymbol";
import { useContext } from "react";
import { AppState } from "../../App";
import NonUserSelectableButton from "./NonUserSelectableButton";
import { Editor } from "slate";

export default function UnderlineButton() {

    const textEditor = useContext(AppState).textEditor

    return (
        <NonUserSelectableButton className="flashcard-button" onClick={event => {
            event.preventDefault()
            const marks = Editor.marks(textEditor)
            if (marks !== null) {
                //@ts-expect-error
                if (marks.underlined) {
                    Editor.removeMark(textEditor, 'underlined')
                } else {
                    Editor.addMark(textEditor, 'underlined', true)
                }
            }   
        }}>
            <MaterialSymbol>format_underlined</MaterialSymbol>
        </NonUserSelectableButton>
    )
}