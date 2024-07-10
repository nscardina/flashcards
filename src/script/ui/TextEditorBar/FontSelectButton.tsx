import { useContext } from "react";
import { Dropdown } from "react-bootstrap";
import { AppState } from "../../App";
import { Editor } from "slate";
import { FormattedText, isFormattedTextMarks } from "../types/leaf/FormattedText";

const WEB_SAFE_FONTS: string[] = [
    "Arial",
    "Courier New",
    "Georgia",
    "Helvetica",
    "Times New Roman",
    "Verdana",
]

const OTHER_FONTS: string[] = [
    "Roboto",
]

export default function FontSelectButton() {

    const appState = useContext(AppState)
    const selectedEditor = appState.textEditors[
        appState.lastEditedTextEditorIndex
    ]

    return (
        <Dropdown className="fc-text-editor-bar-min-content">
            <Dropdown.Toggle className="flashcard-button">
                {appState.currentMarks?.type === "formatted_text"
                    ? ((appState.currentMarks as Omit<FormattedText, "text"> | null)?.fontFamily ?? "Roboto")
                    : "Roboto"}
            </Dropdown.Toggle>
            <Dropdown.Menu>
                <Dropdown.Header>Web Safe Fonts</Dropdown.Header>
                {WEB_SAFE_FONTS.map(font => (
                    <Dropdown.Item key={font} onClick={event => {
                        if (selectedEditor !== null) {

                            const marks = Editor.marks(selectedEditor)
                            if (marks !== null && isFormattedTextMarks(marks)) {
                                if (marks.fontFamily !== undefined) {
                                    Editor.removeMark(selectedEditor, "fontFamily");
                                }
                                Editor.addMark(selectedEditor, "fontFamily", font);
                                appState.setCurrentMarks(Editor.marks(selectedEditor))
                            }
                        }
                        event.preventDefault();
                    }}>
                        {font}
                    </Dropdown.Item>
                ))}

                <Dropdown.Header>Other Fonts</Dropdown.Header>
                {OTHER_FONTS.map(font => <Dropdown.Item key={font} onClick={event => {
                    if (selectedEditor !== null) {

                        const marks = Editor.marks(selectedEditor)
                        if (marks !== null && isFormattedTextMarks(marks)) {
                            if (marks.fontFamily !== undefined) {
                                Editor.removeMark(selectedEditor, "fontFamily");
                            }
                            Editor.addMark(selectedEditor, "fontFamily", font);
                            appState.setCurrentMarks(Editor.marks(selectedEditor))
                        }
                    }
                    event.preventDefault();
                }}>{font}</Dropdown.Item>)}
            </Dropdown.Menu>
        </Dropdown>
    )
}