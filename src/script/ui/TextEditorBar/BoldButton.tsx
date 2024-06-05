import MaterialSymbol from "../MaterialSymbol";
import { useContext } from "react";
import { AppState } from "../../App";
import { Editor } from "slate";
import NonUserSelectableButton from "./NonUserSelectableButton";

export default function BoldButton() {

    const textEditor = useContext(AppState).textEditor

    // const [selection, setSelection] = useState<RangeRef | null>(null)

    return (
        <NonUserSelectableButton className="flashcard-button" onClick={event => {
        
            event.preventDefault()
            // const selection = structuredClone(appState.textEditor.selection)

            const marks = Editor.marks(textEditor)

            if (marks !== null) {
                //@ts-expect-error
                if (marks.bold) {
                    Editor.removeMark(textEditor, 'bold')
                } else {
                    Editor.addMark(textEditor, 'bold', true)
                }
            }   

            // console.log(selection!)
            // Transforms.select(appState.textEditor, {path: appState.textEditor.selection!.anchor, offset: })
        
            
        }}>
            <MaterialSymbol>format_bold</MaterialSymbol>
        </NonUserSelectableButton>
    )
}