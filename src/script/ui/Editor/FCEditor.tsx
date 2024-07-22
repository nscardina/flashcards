import { BaseEditor, Descendant, Editor } from "slate";
import { Editable, ReactEditor, Slate } from "slate-react";
import blockRenderer from "./BlockRenderer";
import renderLeaf from "./Leaf";
import { KeyboardEvent, useContext } from "react";
import { KeyboardInteraction } from "./EditorUtils";
import { listEnterKeyEventHandler } from "../TextEditorBar/ListButton";
import { Side } from "../../card/side";
import { CardContentData } from "../../card/CardContentData";
import { BoxNumber } from "../../card/Box";
import { useFCState } from "../../state/FCState";
import { useShallow } from "zustand/react/shallow";
import { ReactEditorContext } from "../../App";
import { HistoryEditor } from "slate-history";

export function FCEditor({
    editorIndex,
    initialValue
}: {
    editorIndex: number,
    initialValue: Descendant[]
}): JSX.Element {

    // const textEditors = useFCState(state => state.textEditors);
    const state = useContext(ReactEditorContext);

    // const editor = useFCState((state => state.currentEditor))();
    let editor = (editorIndex >= 0 && editorIndex <= 8) ? state[`editor${editorIndex}` as keyof typeof state] as (BaseEditor & ReactEditor & HistoryEditor) : null;

    if (editor !== null) {
        const deck = useFCState(useShallow(state => state.deck));
        const setBoxOnCardFace = useFCState(useShallow(state => state.setBoxOnCardFace));
        const visibleCardIndex = useFCState(useShallow(state => state.visibleCardIndex));
    
        
    
        // if (editor !== null) {
        //     // editor.setSelection({})
        //     // Editor.start(editor, [])
        //     // editor.deselect();
        // }
    
        
    
        const deckSynchronizer = () => {
            
            const side = [0, 1, 2, 3].includes(editorIndex) ? Side.FRONT : Side.BACK;
            let box: unknown = editorIndex % 4 + 1;
    
            if (deck !== null && editor !== null) {
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
            if (editor !== null) {
                KeyboardInteraction.shiftEnterKeyEventHandler(event, editor)
                listEnterKeyEventHandler(event, editor)
                console.log(event);
            }
        }
    
        if (editor !== null) {
            const { isVoid, isInline } = editor
    
            editor.isVoid = element => {
                return ["latex_text_span"].includes(element.type) ? true : isVoid(element)
            }
            
            editor.isInline = element => {
                return ["formatted_text_span"].includes(element.type) ? true : isInline(element)
            }
        }
    
        // const setLastEditedTextEditorIndex = useFCState(useShallow(state => state.setLastEditedTextEditorIndex));
        const setLastEditedTextEditorIndex = state.setLastEditedTextEditorIndex;
        const setCurrentMarks = useFCState(useShallow(state => state.setCurrentMarks));

        console.log("success")
    
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
                        scrollbarWidth: "thin",
                        scrollbarColor: "gray rgba(0,0,0,0)"
                    }}
                    placeholder="Type here..."
                    onSelect={() => {
                        console.log("test")
                        setLastEditedTextEditorIndex(editorIndex);
                        setCurrentMarks(Editor.marks(editor));
                    }}
                    onKeyDown={onKeyDown}
                />
            </Slate>
        )
    }
    else {
        throw `Invalid editor ID ${editorIndex}`
    }

    
}