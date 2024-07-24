import 'bootstrap/dist/css/bootstrap.min.css';
import Dialog from './app/Dialog';
import MenuBar from './ui/MenuBar/MenuBar';
import DeckInteractionArea from './ui/DeckDisplay/DeckInteractionArea';
import NewDeckConfirmationMessage from './ui/NewDeckConfirmationMessage';

import "../style/App.scss"
import DeleteDeckConfirmationMessage from './ui/DeleteDeckConfirmationMessage';
import TextEditorBar from './ui/TextEditorBar/TextEditorBar';
// import LaTeXEditor from './ui/LaTeXEditor';
import { useFCState } from './state/FCState';
import { BaseEditor, createEditor } from 'slate';
import { ReactEditor, withReact } from 'slate-react';
import { HistoryEditor, withHistory } from 'slate-history';
import { createContext } from "react";
import { useState } from 'react';

export type EditorKeyType = `editor${0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8}`

export type ReactEditorStateType = {
    
    lastEditedTextEditorIndex: number,
    setLastEditedTextEditorIndex: React.Dispatch<React.SetStateAction<number>>,
} & {
    [Property in EditorKeyType]: BaseEditor & ReactEditor & HistoryEditor
};



export function getEditorByIndex(state: ReactEditorStateType, index: number): (BaseEditor & ReactEditor & HistoryEditor) | null {
    if (index >= 0 && index <= 8) {
        return state[`editor${index}` as EditorKeyType]
    } else {
        return null
    }
}

export const ReactEditorContext = createContext<ReactEditorStateType>(undefined!);

function App() {

    const [lastEditedTextEditorIndex, setLastEditedTextEditorIndex] = useState(-1);

    // const showLaTeXEditor = useFCState(state => state.showLaTeXEditor)
    const visibleDialog = useFCState(state => state.visibleDialog)

    return (
        <ReactEditorContext.Provider value={{
            editor0: withReact(withHistory(createEditor())),
            editor1: withReact(withHistory(createEditor())),
            editor2: withReact(withHistory(createEditor())),
            editor3: withReact(withHistory(createEditor())),
            editor4: withReact(withHistory(createEditor())),
            editor5: withReact(withHistory(createEditor())),
            editor6: withReact(withHistory(createEditor())),
            editor7: withReact(withHistory(createEditor())),
            editor8: withReact(withHistory(createEditor())),
            lastEditedTextEditorIndex: lastEditedTextEditorIndex,
            setLastEditedTextEditorIndex: setLastEditedTextEditorIndex,
        }}>
            <MenuBar />
            {/* <TextEditorBar /> */}
            <DeckInteractionArea />

            {/* {showLaTeXEditor && <LaTeXEditor />} */}

            {/* {currentDialog} */}

            {visibleDialog === Dialog.NEW_DECK_CONFIRMATION_MESSAGE &&
                <NewDeckConfirmationMessage />
            }
            {
                visibleDialog === Dialog.DELETE_DECK_CONFIRMATION_MESSAGE &&
                <DeleteDeckConfirmationMessage />
            }
        </ReactEditorContext.Provider>
    )
}

namespace App {
    export const LATEX_EDITOR_INDEX = 8;
}

export default App