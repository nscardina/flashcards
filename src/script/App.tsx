import 'bootstrap/dist/css/bootstrap.min.css';
import { createContext, useState } from 'react';
import AppMode from './app/AppMode';
import { AppStateType, NO_CARD_FOCUSED } from './state/AppState';
import { ReviewOrder } from './ReviewOrder';
import { ShowSideProviderName } from './ShowSideProvider';
import Dialog from './app/Dialog';
import { Side } from './card/side';
import MenuBar from './ui/MenuBar/MenuBar';
import DeckInteractionArea from './ui/DeckDisplay/DeckInteractionArea';
import NewDeckConfirmationMessage from './ui/NewDeckConfirmationMessage';
import { Deck } from './card/deck';

import "../style/App.scss"
import DeleteDeckConfirmationMessage from './ui/DeleteDeckConfirmationMessage';
import { withReact } from 'slate-react';
import { withHistory } from 'slate-history';
import { createEditor, Path } from 'slate';
import TextEditorBar from './ui/TextEditorBar/TextEditorBar';
import { CustomText } from './ui/types/slate_defs';
import LaTeXEditor from './ui/LaTeXEditor';

export const AppState = createContext<AppStateType>(undefined!)



function App() {

    const [appMode, setAppMode] = useState<AppMode>(AppMode.MANAGING_FILES)
    const [deck, setDeck] = useState<Deck | null>(null)
    const [recentFiles, setRecentFiles] = useState<FileSystemFileHandle[]>([])
    const [reviewOrder, setReviewOrder] =
        useState<ReviewOrder>(ReviewOrder.IN_ORDER)
    const [showSideProviderName, setShowSideProviderName] =
        useState<ShowSideProviderName>("FRONT")
    const [visibleDialog, setVisibleDialog] = useState<Dialog>(Dialog.NONE)
    const [visibleCardIndex, setVisibleCardIndex] =
        useState<number>(NO_CARD_FOCUSED)
    const [visibleSide, setVisibleSide] = useState<Side>(Side.FRONT)
    const [ textEditors ] = useState(
        () => [
            withReact(withHistory(createEditor())), // 0 to 7 are for the flashcards
            withReact(withHistory(createEditor())),
            withReact(withHistory(createEditor())),
            withReact(withHistory(createEditor())),
            withReact(withHistory(createEditor())),
            withReact(withHistory(createEditor())),
            withReact(withHistory(createEditor())),
            withReact(withHistory(createEditor())),
            withReact(withHistory(createEditor())), // 8 is for the LaTeX editor
        ]
    )
    const [ lastEditedTextEditorIndex, setLastEditedTextEditorIndex ] = useState<number>(0)   
    const [ lastEditedNodePath, setLastEditedNodePath ] = useState<Path>([]) 

    const [ currentMarks, setCurrentMarks ] = useState<(Omit<CustomText, "text"> | null)>(null)

    const [currentDialog, setCurrentDialog] = useState<JSX.Element>(<></>)

    const [showLaTeXEditor, setShowLaTeXEditor] = useState<boolean>(false)
    const [shouldLaTeXEditorReplace, setShouldLaTeXEditorReplace] = useState<boolean>(false)



    return (
        <>
            <AppState.Provider value={{
                appMode: appMode,
                setAppMode: setAppMode,
                deck: deck,
                setDeck: setDeck,
                recentFiles: recentFiles,
                setRecentFiles: setRecentFiles,
                reviewOrder: reviewOrder,
                setReviewOrder: setReviewOrder,
                showSideProviderName: showSideProviderName,
                setShowSideProviderName: setShowSideProviderName,
                visibleDialog: visibleDialog,
                setVisibleDialog: setVisibleDialog,
                visibleCardIndex: visibleCardIndex,
                setVisibleCardIndex: setVisibleCardIndex,
                visibleSide: visibleSide,
                setVisibleSide: setVisibleSide,
                
                textEditors: textEditors,
                lastEditedTextEditorIndex: lastEditedTextEditorIndex,
                setLastEditedTextEditorIndex: setLastEditedTextEditorIndex,
                lastEditedNodePath: lastEditedNodePath,
                setLastEditedNodePath: setLastEditedNodePath,
                currentMarks: currentMarks,
                setCurrentMarks: setCurrentMarks,

                currentDialog: currentDialog,
                setCurrentDialog: setCurrentDialog,

                showLaTeXEditor: showLaTeXEditor,
                setShowLaTeXEditor: setShowLaTeXEditor,
                shouldLaTeXEditorReplace: shouldLaTeXEditorReplace,
                setShouldLaTeXEditorReplace: setShouldLaTeXEditorReplace,
            }}>
                <MenuBar />
                <TextEditorBar />
                <DeckInteractionArea />

                {showLaTeXEditor && <LaTeXEditor />}

                {currentDialog}

                {visibleDialog === Dialog.NEW_DECK_CONFIRMATION_MESSAGE &&
                    <NewDeckConfirmationMessage />
                }
                {
                    visibleDialog === Dialog.DELETE_DECK_CONFIRMATION_MESSAGE &&
                    <DeleteDeckConfirmationMessage />
                }

            </AppState.Provider>
        </>
    )
}

namespace App {
    export const LATEX_EDITOR_INDEX = 8;
}

export default App