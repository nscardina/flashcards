import { Descendant, Editor } from "slate";
import { Editable, Slate } from "slate-react";
import blockRenderer from "./BlockRenderer";
import renderLeaf from "./Leaf";
import { KeyboardEvent, useContext } from "react";
import { AppState } from "../../App";
import { KeyboardInteraction } from "./EditorUtils";
import { listEnterKeyEventHandler } from "../TextEditorBar/ListButton";
import { Side } from "../../card/side";
import { Deck } from "../../card/deck";
import { CardContentData } from "../../card/CardContentData";
import { BoxNumber } from "../../card/Box";

export function FCEditor({
    editorIndex,
    initialValue
}: {
    editorIndex: number,
    initialValue: Descendant[]
}): JSX.Element {

    const appState = useContext(AppState);
    const editor = appState.textEditors[editorIndex];
    editor.setSelection({})

    const deckSynchronizer = () => {
        
        const side = [0, 1, 2, 3].includes(editorIndex) ? Side.FRONT : Side.BACK;
        let box: unknown = editorIndex % 4 + 1;

        if (appState.deck !== null) {
            appState.setDeck(Deck.setBoxOnCardFace(
                appState.deck,
                appState.visibleCardIndex,
                side,
                String(box) as BoxNumber,
                {
                    type: CardContentData.Type.TEXT,
                    textNodes: editor.children,
                }
            ))
        }

        console.log(appState.deck)
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
                onSelect={() => {
                    appState.setLastEditedTextEditorIndex(editorIndex);
                    appState.setCurrentMarks(Editor.marks(appState.textEditors[
                        appState.lastEditedTextEditorIndex
                    ]))
                }}
                onKeyDown={onKeyDown}
                

            />
        </Slate>
    )
}