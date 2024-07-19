import { Descendant, Editor } from "slate";
import { Editable, Slate } from "slate-react";
import blockRenderer from "./BlockRenderer";
import renderLeaf from "./Leaf";
import { KeyboardEvent } from "react";
import { KeyboardInteraction } from "./EditorUtils";
import { listEnterKeyEventHandler } from "../TextEditorBar/ListButton";
import { Side } from "../../card/side";
import { CardContentData } from "../../card/CardContentData";
import { BoxNumber } from "../../card/Box";
import { useFCState } from "../../state/FCState";
import { useShallow } from "zustand/react/shallow";

export function FCEditor({
    editorIndex,
    initialValue
}: {
    editorIndex: number,
    initialValue: Descendant[]
}): JSX.Element {

    const textEditors = useFCState(state => state.textEditors);
    console.log(textEditors);

    const editor = useFCState((state => state.currentEditor))();
    const deck = useFCState(useShallow(state => state.deck));
    const setBoxOnCardFace = useFCState(useShallow(state => state.setBoxOnCardFace));
    const visibleCardIndex = useFCState(useShallow(state => state.visibleCardIndex));

    editor.setSelection({})

    const deckSynchronizer = () => {
        
        const side = [0, 1, 2, 3].includes(editorIndex) ? Side.FRONT : Side.BACK;
        let box: unknown = editorIndex % 4 + 1;

        if (deck !== null) {
            setBoxOnCardFace(
                visibleCardIndex,
                side,
                String(box) as BoxNumber,
                {
                    type: CardContentData.Type.TEXT,
                    textNodes: editor.children,
                }
            );
        }
    }

    const onKeyDown = (event: KeyboardEvent) => {
        // Handle Shift+Enter behavior
        KeyboardInteraction.shiftEnterKeyEventHandler(event, editor)
        listEnterKeyEventHandler(event, editor)
    }
    const { isVoid, isInline } = editor

    editor.isVoid = element => {
        return ["latex_text_span"].includes(element.type) ? true : isVoid(element)
    }
    
    editor.isInline = element => {
        return ["formatted_text_span"].includes(element.type) ? true : isInline(element)
    }

    const setLastEditedTextEditorIndex = useFCState(useShallow(state => state.setLastEditedTextEditorIndex));
    const setCurrentMarks = useFCState(useShallow(state => state.setCurrentMarks));
    const currentEditor = useFCState(useShallow(state => state.currentEditor))();

    return (
        <Slate editor={editor} initialValue={initialValue} onChange={deckSynchronizer}>
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
                placeholder="Type here..."
                onSelect={() => {
                    console.log("test")
                    setLastEditedTextEditorIndex(editorIndex);
                    setCurrentMarks(Editor.marks(currentEditor));
                }}
                onKeyDown={onKeyDown}
            />
        </Slate>
    )
}