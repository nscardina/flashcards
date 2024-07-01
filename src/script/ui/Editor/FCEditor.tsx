import { Descendant } from "slate";
import { Editable, Slate } from "slate-react";
import blockRenderer from "./BlockRenderer";
import renderLeaf from "./Leaf";
import { useContext } from "react";
import { AppState } from "../../App";

export function FCEditor({
    editorIndex,
    initialValue
}: {
    editorIndex: number,
    initialValue: Descendant[]
}): JSX.Element {

    const appState = useContext(AppState);
    const editor = appState.textEditors[editorIndex];

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

            />
        </Slate>
    )
}