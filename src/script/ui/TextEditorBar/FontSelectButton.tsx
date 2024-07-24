import { Dropdown } from "react-bootstrap";
import { Editor } from "slate";
import { isFormattedTextMarks } from "../types/leaf/FormattedText";
import { useFCState } from "../../state/FCState";
import { useShallow } from "zustand/react/shallow";
import { useContext } from "react";
import { getEditorByIndex, ReactEditorContext } from "../../App";

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

    // const selectedEditor = useFCState(state => state.currentEditor)();
    const state = useContext(ReactEditorContext);
    const selectedEditor = getEditorByIndex(state, state.lastEditedTextEditorIndex);
    const deck = useFCState(useShallow(state => state.deck));
    // const currentMarks = useFCState(state => state.currentMarks);
    const setCurrentMarks = useFCState(state => state.setCurrentMarks);

    return (
        <Dropdown className="fc-text-editor-bar-min-content">
            <Dropdown.Toggle className="flashcard-button"
            disabled={deck === null}
            style={{color: (deck === null) ? "var(--bs-secondary)" : "inherit"}}
            >
                {/* {currentMarks?.type === "formatted_text"
                    ? ((currentMarks as Omit<FormattedText, "text"> | null)?.fontFamily ?? "Roboto")
                    : "Roboto"} */}
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
                                setCurrentMarks(Editor.marks(selectedEditor))
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
                            setCurrentMarks(Editor.marks(selectedEditor))
                        }
                    }
                    event.preventDefault();
                }}>{font}</Dropdown.Item>)}
            </Dropdown.Menu>
        </Dropdown>
    )
}