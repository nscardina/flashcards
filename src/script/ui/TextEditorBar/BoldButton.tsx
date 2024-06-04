import { Button } from "react-bootstrap";
import MaterialSymbol from "../MaterialSymbol";
import { useContext } from "react";
import { AppState } from "../../App";
import { Editor } from "slate";

export default function BoldButton() {

    const appState = useContext(AppState)

    // const [selection, setSelection] = useState<RangeRef | null>(null)

    return (
        <Button style={{userSelect: "none"}} className="flashcard-button" onClick={event => {
        
            event.preventDefault()
            // const selection = structuredClone(appState.textEditor.selection)

            const marks = Editor.marks(appState.textEditor)

            if (marks !== null) {
                //@ts-expect-error
                if (marks.bold) {
                    Editor.removeMark(appState.textEditor, 'bold')
                } else {
                    Editor.addMark(appState.textEditor, 'bold', true)
                }
            }   

            // console.log(selection!)
            // Transforms.select(appState.textEditor, {path: appState.textEditor.selection!.anchor, offset: })
        
            
        }}>
            <MaterialSymbol>format_bold</MaterialSymbol>
        </Button>
    )
}