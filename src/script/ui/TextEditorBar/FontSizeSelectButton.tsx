import { useContext } from "react";
import { Dropdown } from "react-bootstrap";
import { AppState } from "../../App";
import { Editor } from "slate";
import { isFormattedTextMarks } from "../types/leaf/FormattedText";

const FONT_SIZES = [
    ["xx-small", "super small"],
    ["x-small", "very small"],
    ["small", "small"],
    ["medium", "medium"],
    ["large", "large"],
    ["x-large", "very large"],
    ["xx-large", "super large"],
    ["xxx-large", "ultra large"],
]

export default function FontSizeSelectButton() {

    const appState = useContext(AppState)
    const selectedEditor = appState.textEditors[
        appState.lastEditedTextEditorIndex
    ]

    return (
        <Dropdown className="fc-text-editor-bar-min-content">
            <Dropdown.Toggle className="flashcard-button">
                {(appState.currentMarks !== null
                    && isFormattedTextMarks(appState.currentMarks)
                    ? (appState.currentMarks.fontSize ?? "medium") : "medium"
                )}
            </Dropdown.Toggle>
            <Dropdown.Menu>
                {FONT_SIZES.map(size => <Dropdown.Item key={size[0]} onClick={event => {
                        if (selectedEditor !== null) {
                            
                            const marks = Editor.marks(selectedEditor)
                            if (marks !== null && isFormattedTextMarks(marks)) {
                                if (marks.fontSize) {
                                    Editor.removeMark(selectedEditor, "fontSize");
                                }
                                Editor.addMark(selectedEditor, "fontSize", size[0]);
                                appState.setCurrentMarks(Editor.marks(selectedEditor))
                            }
                        }
                        event.preventDefault();
                    }}>{size[1]}</Dropdown.Item>)}
            </Dropdown.Menu>
        </Dropdown>
    )
}