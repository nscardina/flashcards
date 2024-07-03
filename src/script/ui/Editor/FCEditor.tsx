import { Descendant } from "slate";
import { Editable, Slate } from "slate-react";
import blockRenderer from "./BlockRenderer";
import renderLeaf from "./Leaf";
import { KeyboardEvent, useContext } from "react";
import { AppState } from "../../App";
import { KeyboardInteraction } from "./EditorUtils";
import { listEnterKeyEventHandler } from "../TextEditorBar/ListButton";

export function FCEditor({
    editorIndex,
    initialValue
}: {
    editorIndex: number,
    initialValue: Descendant[]
}): JSX.Element {

    const appState = useContext(AppState);
    const editor = appState.textEditors[editorIndex];

    const onKeyDown = (event: KeyboardEvent) => {
        // Handle Shift+Enter behavior
        KeyboardInteraction.shiftEnterKeyEventHandler(event, editor)
        listEnterKeyEventHandler(event, editor)
    }

    return (
        <Slate editor={editor} initialValue={initialValue}>
            <Editable renderElement={blockRenderer}
                renderLeaf={renderLeaf}
                style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "1rem",
                    overflow: "scroll",
                    display: "flex",
                    flexDirection: "column",
                }}
                onSelect={() => {
                    appState.setLastEditedTextEditorIndex(editorIndex);
                }}
                onKeyDown={onKeyDown}

            />
        </Slate>
    )
}