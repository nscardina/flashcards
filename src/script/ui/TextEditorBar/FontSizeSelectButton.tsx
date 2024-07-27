import { Dropdown } from "react-bootstrap";
import { Editor } from "slate";
import { isFormattedTextMarks } from "../types/leaf/FormattedText";
import { useFCState } from "../../state/FCState";
import { useShallow } from "zustand/react/shallow";
import { useContext } from "react";
import { getEditorByIndex, ReactEditorContext } from "../../App";

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

    const deck = useFCState(useShallow(state => state.deck));
    const currentMarks = useFCState(state => state.currentMarks);
    const setCurrentMarks = useFCState(state => state.setCurrentMarks);
    // const selectedEditor = useFCState(state => state.currentEditor)();
    const state = useContext(ReactEditorContext);
    const selectedEditor = getEditorByIndex(state, state.lastEditedTextEditorIndex);

    return (
        <Dropdown className="fc-text-editor-bar-min-content">
            <Dropdown.Toggle className="flashcard-button" style={{
                textTransform: "capitalize",
                color: (deck === null) ? "var(--bs-secondary)" : "inherit",
            }}
                disabled={deck === null}
            >
                {(currentMarks !== null
                    && isFormattedTextMarks(currentMarks)
                    ? (currentMarks.fontSize ?? "medium") : "medium"
                )}
            </Dropdown.Toggle>
            <Dropdown.Menu>
                <Dropdown.Header>Font Sizes</Dropdown.Header>
                {FONT_SIZES.map(size => <Dropdown.Item key={size[0]} 
                style={{textTransform: "capitalize"}}
                onClick={event => {
                        if (selectedEditor !== null) {
                            
                            const marks = Editor.marks(selectedEditor)
                            if (marks !== null && isFormattedTextMarks(marks)) {
                                if (marks.fontSize) {
                                    Editor.removeMark(selectedEditor, "fontSize");
                                }
                                Editor.addMark(selectedEditor, "fontSize", size[0]);
                                setCurrentMarks(Editor.marks(selectedEditor))
                            }
                        }
                        event.preventDefault();
                    }}>{size[1]}</Dropdown.Item>)}
            </Dropdown.Menu>
        </Dropdown>
    )
}